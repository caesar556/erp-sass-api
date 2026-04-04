import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreasuriesService } from './treasuries.service';
import { TreasuriesController } from './treasuries.controller';
import { Treasury } from './treasury.entity';
import { AccountModule } from '../account/account.module';


@Module({
  imports: [TypeOrmModule.forFeature([Treasury]), AccountModule],
  controllers: [TreasuriesController],
  providers: [TreasuriesService],
})
export class TreasuriesModule { }
