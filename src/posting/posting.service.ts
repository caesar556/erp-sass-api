import {
  Injectable,
  BadRequestException,
  NotFoundException
} from '@nestjs/common';
import { DataSource } from 'typeorm';

import { Account } from '../account/account.entity';
import { Treasury } from '../treasuries/treasury.entity';
import { Transaction } from '../transactions/transaction.entity';

import { JournalService } from '../journal/journal.service';
import { PostNormalTransactionDto } from './dto/posting.dto';

@Injectable()
export class PostingService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly journalService: JournalService,
  ) {}

  async postNormalTransaction(dto: PostNormalTransactionDto) {
    return this.dataSource.transaction(async (manager) => {

      const {
        name,
        description,
        treasuryId,
        offsetAccountId,
        type,
        amount,
        organizationId,
        reference,
        referenceId,
        paymentMethod,
      } = dto;

      if (amount <= 0) {
        throw new BadRequestException('Amount must be greater than 0');
      }

      const treasury = await manager.findOne(Treasury, {
        where: { id: treasuryId },
        relations: ['account', 'account.organization'],
      });

      if (!treasury || !treasury.account) {
        throw new NotFoundException('Treasury not found or has no account');
      }

      const offsetAccount = await manager.findOne(Account, {
        where: { id: offsetAccountId },
        relations: ['organization'],
      });

      if (!offsetAccount) {
        throw new NotFoundException('Offset account not found');
      }

      if (
        treasury.account.organization.id !== organizationId ||
        offsetAccount.organization.id !== organizationId
      ) {
        throw new BadRequestException('Accounts must belong to same organization');
      }

      const lines =
        type === 'IN'
          ? [
              {
                accountId: treasury.account.id,
                debit: amount,
                credit: 0,
              },
              {
                accountId: offsetAccount.id,
                debit: 0,
                credit: amount,
              },
            ]
          : [
              {
                accountId: offsetAccount.id,
                debit: amount,
                credit: 0,
              },
              {
                accountId: treasury.account.id,
                debit: 0,
                credit: amount,
              },
            ];

      const journalEntry = await this.journalService.createEntry(manager, {
        description: description || 'معاملة بدون وصف',
        organizationId,
        date: new Date(),
        referenceType: reference,
        referenceId,
        lines,
      });

      const transaction = manager.create(Transaction, {
        name,
        description,
        amount,
        type,
        organization: { id: organizationId },
        reference,
        treasury: { id: treasuryId },
        paymentMethod,
        journalEntry,
      });

      return await manager.save(transaction);
    });
  }
}