export class TransactionHistory {
  public transactions: Transaction[] = [];

  constructor(initialTransactions: Transaction[] = []) {
    this.transactions = [...initialTransactions];
  }

  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
  }

  getTransactionsWithinMonth() {
    const currentDate = new Date();
    const currentMonth = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}`;

    const transactionsWithinCurrentMonth = this.transactions.filter(
      (transaction) => {
        const transactionDate = new Date(transaction.date);
        const transactionMonth = `${transactionDate.getFullYear()}-${(
          transactionDate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}`;

        return transactionMonth === currentMonth;
      }
    );

    return transactionsWithinCurrentMonth.length;
  }
}

// export class TransactionHistory {
//   public static allTransactions: Transaction[] = [];
//   public transactions: Transaction[] = [];

//   constructor() {
//     this.transactions = [...TransactionHistory.allTransactions];
//   }

//   addTransaction(transaction: Transaction): void {
//     console.log(this.transactions, "play ful");
//     this.transactions.push(transaction);
//     TransactionHistory.allTransactions.push(transaction);
//   }

//   getTransactionsWithinMonth(): Transaction[] {
//     const currentDate = new Date();
//     const firstDayOfMonth = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       1
//     );
//     return this.transactions.filter(
//       (transaction) =>
//         transaction.type !== TransactionType.Airtime &&
//         transaction.date >= firstDayOfMonth
//     );
//   }
// }

export enum UserType {
  Business = "business",
  Retail = "retail",
}

export enum TransactionType {
  Transfer = "transfer",
  Airtime = "airtime",
}

export enum NetworkProvider {
  Airtel = "Airtel",
  MTN = "MTN",
  Glo = "Glo",
  Etisalat = "Etisalat",
}

export interface Customer {
  username: string;
  userType: UserType;
  customerSince: Date;
  transactionHistory?: TransactionHistory;
  accountBalance: number; // New field
  calculateDiscount(transaction: Transaction): number;
}

export interface Transaction {
  type: TransactionType;
  accountNumber: string;
  amount: Number;
  name: string;
  date: Date;
}

export interface TransferTransaction extends Transaction {
  destinationAccount: string;
}

export interface AirtimeTransaction extends Transaction {
  networkProvider: string;
  phoneNumber: string;
}

export interface Routes {
  name: string;
  link: string;
  icon: JSX.Element;
  disabled?: boolean;
}
