"use client";

import { TransactionType } from "@/models";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

function maskCreditCard(creditCardNumber: string) {
  if (creditCardNumber) {
    const visibleDigits = 4;
    const maskedNumber =
      "*".repeat(creditCardNumber.length - visibleDigits) +
      creditCardNumber.slice(-visibleDigits);
    return maskedNumber;
  }
}

export type Payment = {
  accountNumber: string;
  type: TransactionType.Airtime | TransactionType.Transfer;
  date: string;
  amount: number;
  name: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name")!;

      return <div className="pl-3 py-3 font-medium">{name.toString()}</div>;
    },
  },
  {
    accessorKey: "accountNumber",
    header: "Account Number",
    cell: ({ row }) => {
      const accountNumber = parseFloat(row.getValue("accountNumber"));
      const formatted = maskCreditCard(accountNumber.toString());

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(amount);

      return <div className=" font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type")!;

      return (
        <div className=" py-4 capitalize font-medium">{type.toString()}</div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("date")!;

      return (
        <div className=" py-4 capitalize font-medium">
          {format(new Date(date as Date), "dd MMMM yyyy")}
        </div>
      );
    },
  },
];
