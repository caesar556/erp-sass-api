import { Injectable, BadRequestException } from '@nestjs/common';
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
  
  async create(name: string, organizationId: string) {
    const account = await this.accountService.create({
      name,
      organizationId,
      type: AccountType.ASSET
    });

    const existingTreasury = await this.treasuryRepo.findOne({
      where: {
        name,
        organization: { id: organizationId },
      },
      relations: ['account'],
    });

    if (existingTreasury) {
      throw new BadRequestException('Treasury already exists');
    }

    const treasury = await this.treasuryRepo.create({
      name,
      account,
      organization: { id: organizationId },
    });
    return this.treasuryRepo.save(treasury);
  }
}
