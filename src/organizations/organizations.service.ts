import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from './organization.entity';
import { CreateOrganizationDto } from './dto/organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepo: Repository<Organization>,
  ) { }
  async getAll() {
    return await this.organizationRepo.find();
  }
  async create(createDto: CreateOrganizationDto): Promise<Organization> {
    const organization = this.organizationRepo.create(createDto);
    return await this.organizationRepo.save(organization);
  }

}
