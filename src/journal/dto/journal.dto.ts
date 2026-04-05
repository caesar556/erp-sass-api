export class JournalLineDto {
  accountId: string;
  debit: number;
  credit: number;
}

export class CreateJournalEntryDto {
  description?: string;

  date: Date;
  organizationId: string;

  referenceType?: string;
  referenceId?: string;

  lines: JournalLineDto[];
}