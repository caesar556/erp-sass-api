import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/organization.dto';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {
  }
  @Get()
  async findAll() {
    return await this.organizationsService.getAll();
  }

  @Post()
  async create(@Body() createDto: CreateOrganizationDto) {
    return await this.organizationsService.create(createDto);
  }
}
