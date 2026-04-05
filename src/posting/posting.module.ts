import { Module } from '@nestjs/common';
import { PostingService } from './posting.service';
import { AccountModule } from '../account/account.module';
import { JournalModule } from '../journal/journal.module';

@Module({
  imports: [AccountModule, JournalModule],
  providers: [PostingService],
  exports: [PostingService]
})
export class PostingModule { }
