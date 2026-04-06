export enum AccountType {
  ASSET = 'asset',
  LIABILITY = 'liability',
  EQUITY = 'equity',
  REVENUE = 'revenue',
  EXPENSE = 'expense',
}

export enum PaymentMethods {
  CASH = 'cash',
  CHEQUE = 'cheque',
  TRANSFER = 'transfer',
}

export enum TransactionReference {
  CUSTOMER_ACCOUNT = 'CUSTOMER_ACCOUNT',
  SUPPLIER_ACCOUNT = 'SUPPLIER_ACCOUNT',
  EXPENSE = 'EXPENSE',
  REVENUE = 'REVENUE',
}

export enum MoneyStatus {
  IN = "IN",
  OUT = "OUT",
}