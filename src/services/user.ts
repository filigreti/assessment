import {
  AirtimeTransaction,
  Customer,
  Transaction,
  TransactionHistory,
  TransferTransaction,
  UserType,
} from "@/models";

export class UserService implements Customer {
  constructor(
    public username: string,
    public userType: UserType,
    public customerSince: Date,
    public transactionHistory: TransactionHistory,
    public accountBalance: number
  ) {
    this.transactionHistory = new TransactionHistory(
      this.transactionHistory.transactions
    );
    this.accountBalance = accountBalance;
    this.userType = userType;
    this.username = username;
    this.customerSince = customerSince;
  }

  calculateDiscount(transaction: Transaction): number {
    const transactionsWithinMonth =
      this.transactionHistory.getTransactionsWithinMonth();

    if (
      this.userType === UserType.Business &&
      transactionsWithinMonth >= 3 &&
      +transaction.amount > 150000
    ) {
      return 0.27;
    }

    if (
      this.userType === UserType.Retail &&
      transactionsWithinMonth >= 3 &&
      +transaction.amount > 50000
    ) {
      return 0.18;
    }

    if (
      this.customerSince.getFullYear() <= new Date().getFullYear() - 4 &&
      transactionsWithinMonth < 3
    ) {
      return 0.1;
    }
    return 0;
  }
}

export class BankTransaction {
  static doTransfer(request: Transaction, user: Customer): number {
    const discount = user.calculateDiscount(request);
    const discountedAmount = +request.amount * (1 - discount);
    if (user.accountBalance >= discountedAmount && user.transactionHistory) {
      user.accountBalance -= discountedAmount;

      user.transactionHistory.addTransaction(request);

      return discountedAmount;
    } else {
      return 0;
    }
  }

  static buyAirtime(request: AirtimeTransaction, user: Customer): number {
    if (user.transactionHistory && +user.accountBalance >= +request.amount) {
      user.accountBalance -= +request.amount;
      user.transactionHistory.addTransaction(request);
      return +request.amount;
    } else {
      return 0;
    }
  }
}
