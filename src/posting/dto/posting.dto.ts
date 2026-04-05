import { PaymentMethods, TransactionReference } from '../../utils/enums';

export class PostNormalTransactionDto {
  name: string;
  description?: string;

  treasuryId: string;
  offsetAccountId: string;

  type: 'IN' | 'OUT';
  amount: number;

  organizationId: string;

  paymentMethod?: PaymentMethods;

  reference: TransactionReference;
  referenceId?: string;
}