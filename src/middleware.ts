import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { Customer, TransactionHistory, UserType } from "./models";

export function middleware(req: NextResponse) {
  const response = NextResponse.next();
  const cookieStore = cookies();
  const cookieData = cookieStore.get("admin")?.value;
  if (cookieData) {
    return NextResponse.next();
  }

  const loginData: Customer = {
    username: "admin",
    userType: UserType.Business,
    customerSince: new Date(),
    accountBalance: 1000000,
    calculateDiscount: () => 0,
    transactionHistory: new TransactionHistory(),
  };

  const payees = [
    {
      accountNumber: "1234567890",
      name: "John Doe",
    },
    {
      accountNumber: "0987654321",
      name: "Jane Smith",
    },
    {
      accountNumber: "5678901234",
      name: "Bob Johnson",
    },
  ];

  const stringifyData = JSON.stringify(loginData);
  const stringifyPayees = JSON.stringify(payees);

  response.cookies.set("admin", stringifyData);
  response.cookies.set("payees", stringifyPayees);
  response.cookies.set("currentUser", "admin");

  return response;
}

export const config = {
  matcher: "/",
};
