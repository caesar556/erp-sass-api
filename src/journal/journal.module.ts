import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JournalService } from './journal.service';
import { JournalController } from './journal.controller';
import { JournalEntry } from './entities/journal_entries.entity';
import { JournalLine } from './entities/journal_lines.entity';


@Module({
  imports: [TypeOrmModule.forFeature([JournalEntry, JournalLine])],
  controllers: [JournalController],
  providers: [JournalService],
  exports: [JournalService]
})
export class JournalModule { }
