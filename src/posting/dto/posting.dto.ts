import { IsEnum } from 'class-validator';
import { PaymentMethods, TransactionReference, MoneyStatus } from '../../utils/enums';

export class PostNormalTransactionDto {
  name: string;
  description?: string;

  treasuryId: string;
  offsetAccountId: string;
   @IsEnum(MoneyStatus)
  type: MoneyStatus;
  amount: number;

  organizationId: string;
  @IsEnum(PaymentMethods)
  paymentMethod?: PaymentMethods;
  @IsEnum(TransactionReference)
  reference: TransactionReference;
  referenceId?: string;
}