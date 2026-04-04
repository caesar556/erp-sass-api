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
  // organztion will add but now 
  async create(data: {
    name: string;
    type: AccountType;
    parentId?: string;
  }): Promise<Account> {
    const { name, type, parentId } = data;

    if (!name) throw new BadRequestException('Account name is required')

    if (!Object.values(AccountType).includes(type)) {
      throw new BadRequestException('Invalid account type');
    }

    let parent: Account | undefined = null;

    if (parentId) {
      parent = await this.accountRepo.findOne({
        where: { id: parentId }
      });
      if (!parent) {
        throw new BadRequestException('Parent account not found');
      }
    }

    const accountData: Partial<Account> = {
      name,
      type,
    };

    if (parent) accountData.parent = parent;
    const account = this.accountRepo.create(accountData);

    return this.accountRepo.save(account);
  }
}
