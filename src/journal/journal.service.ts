import { Injectable, BadRequestException } from '@nestjs/common';
import { EntityManager, In } from 'typeorm';
import { JournalEntry } from './entities/journal_entries.entity';
import { JournalLine } from './entities/journal_lines.entity';
import { Account } from '../account/account.entity';
import { CreateJournalEntryDto } from './dto/journal.dto';

@Injectable()
export class JournalService {

  async createEntry(
    manager: EntityManager,
    dto: CreateJournalEntryDto
  ): Promise<JournalEntry> {

    if (!dto.lines || dto.lines.length < 2) {
      throw new BadRequestException('Journal entry must have at least 2 lines');
    }

    let totalDebit = 0;
    let totalCredit = 0;

    for (const l of dto.lines) {
      if (l.debit > 0 && l.credit > 0) {
        throw new BadRequestException('Line cannot have both debit and credit');
      }

      if (l.debit === 0 && l.credit === 0) {
        throw new BadRequestException('Line must have value');
      }

      totalDebit += Number(l.debit);
      totalCredit += Number(l.credit);
    }

    if (totalDebit !== totalCredit) {
      throw new BadRequestException('Journal entry not balanced');
    }

    const accountIds = dto.lines.map(l => l.accountId);

    const accounts = await manager.findBy(Account, {
      id: In(accountIds),
    });

    if (accounts.length !== accountIds.length) {
      throw new BadRequestException('Some accounts not found');
    }

    const accountMap = new Map(accounts.map(acc => [acc.id, acc]));

    const entry = manager.create(JournalEntry, {
      description: dto.description,
      date: dto.date,
      organization: { id: dto.organizationId },
      referenceType: dto.referenceType,
      referenceId: dto.referenceId,
    });

    const lines: JournalLine[] = dto.lines.map((l) => {
      const account = accountMap.get(l.accountId);

      return manager.create(JournalLine, {
        debit: l.debit,
        credit: l.credit,
        account,
        organization: { id: dto.organizationId },
        entry,
      });
    });

    entry.lines = lines;

    return await manager.save(entry);
  }
}