import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Treasury } from './treasury.entity';
import { AccountService } from '../account/account.service';
import { AccountType } from '../utils/enums';

@Injectable()
export class TreasuriesService {
  constructor(
    private readonly accountService: AccountService,
    @InjectRepository(Treasury)
    private readonly treasuryRepo: Repository<Treasury>
  ) { }
  async getAll() {
    return this.treasuryRepo.find();
  }
  async create(name: string) {
    const account = await this.accountService.create({
      name,
      type: AccountType.ASSET
    });

    const treasury = await this.treasuryRepo.create({
      name,
      account
    });
    return this.treasuryRepo.save(treasury);
  }
}
