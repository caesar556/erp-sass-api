import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { Repository } from 'typeorm';
import { AccountType } from '../utils/enums';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
  ) { }
  async create(data: {
    name: string;
    type: AccountType;
    organizationId: string;
    parentId?: string;
  }): Promise<Account> {

    const { name, type, parentId, organizationId } = data;

    if (!organizationId) {
      throw new BadRequestException('organization ID is required');
    }

    let parent: Account | undefined;

    if (parentId) {
      const foundParent = await this.accountRepo.findOne({
        where: {
          id: parentId,
          organization: { id: organizationId },
        },
      });

      if (!foundParent) {
        throw new BadRequestException('Parent account not found');
      }

      parent = foundParent;
    }

    const existing = await this.accountRepo.findOne({
      where: {
        name,
        organization: { id: organizationId },
      },
    });

    if (existing) {
      return existing;
    }

    const account = this.accountRepo.create({
      name,
      type,
      organization: { id: organizationId },
      ...(parent && { parent }),
    });

    return this.accountRepo.save(account);
  }


}
