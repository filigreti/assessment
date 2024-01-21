"use server";

import { Customer, TransactionHistory, UserType } from "@/models";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginUser(formData: FormData) {
  const username = formData.get("username");
  const userType = formData.get("userType");
  const cookieStore = cookies();
  const getLoginUser = cookieStore.get(username as string);
  cookieStore.set("currentUser", username as string);
  if (getLoginUser?.name === username) {
    const existingUserData: Pick<Customer, "username" | "userType"> =
      JSON.parse(getLoginUser.value);

    const updatedUser: Pick<Customer, "username" | "userType"> = {
      ...existingUserData,
      username,
      userType: userType as UserType,
    };
    cookieStore.set(username as string, JSON.stringify(updatedUser));
  } else {
    const newUserData: Customer = {
      username: username as string,
      userType: userType as UserType,
      customerSince: new Date(),
      accountBalance: 1000000,
      calculateDiscount: () => 0,
      transactionHistory: new TransactionHistory(),
    };

    cookieStore.set(username as string, JSON.stringify(newUserData));
  }

  redirect("/dashboard");
}

export async function cookieData() {
  const cookieStore = cookies();
  const data = cookieStore.get("currentUser")?.value;
  if (!data) {
    return false;
  }
  return cookieStore.get(data as string)?.value;
}

export async function updatePayee(prevState: any, formData: FormData) {
  const name = formData.get("name");
  const accountNumber = formData.get("accountNumber");
  const cookieStore = cookies();
  const customers = cookieStore.get("payees" as string);
  if (customers) {
    const existingUserData = JSON.parse(customers.value);
    const updatedPayees = [{ name, accountNumber }, ...existingUserData];
    cookieStore.set("payees", JSON.stringify(updatedPayees));
    revalidatePath("/dashboard");
    return updatedPayees;
  }
}

export async function updateCookie(data: any) {
  const cookieStore = cookies();
  const user = cookieStore.get("currentUser")?.value!;
  cookieStore.set(user, data);
  // console.log(user, "play");
}
