import { Injectable } from '@nestjs/common';
import { PostNormalTransactionDto } from '../posting/dto/posting.dto';
import { PostingService } from '../posting/posting.service';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly postingService: PostingService,
  ) { }

  async createNormalTransaction(dto: PostNormalTransactionDto) {
    return await this.postingService.postNormalTransaction(dto);
  }
}
