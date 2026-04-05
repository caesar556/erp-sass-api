import { Controller, Post, Body, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { PostNormalTransactionDto } from '../posting/dto/posting.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @Post()
  async createNormal(@Body() dto: PostNormalTransactionDto) {
    return this.transactionsService.createNormalTransaction(dto);
  }
}
