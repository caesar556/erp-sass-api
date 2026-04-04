import { Controller, Get, Post, Body } from '@nestjs/common';
import { TreasuriesService } from './treasuries.service';
import { CreateTreasuryDto } from './dto/treasury.dto';

@Controller('treasuries')
export class TreasuriesController {
  constructor(private readonly treasuriesService: TreasuriesService) { }

  @Get()
  getAll() {
    return this.treasuriesService.getAll();
  }
  @Post()
  create(@Body() dto: CreateTreasuryDto) {
    return this.treasuriesService.create(dto.name);
  }

}
