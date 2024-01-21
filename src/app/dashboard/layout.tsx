import SideBar from "@/components/sidebar";
import TopHeader from "@/components/topHeader";
import { Customer } from "@/models";
import { cookies } from "next/headers";
import { cookieData } from "../actions";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await cookieData();
  let parsedData;
  if (data) {
    parsedData = JSON.parse(data) as Pick<Customer, "username" | "userType">;
  }

  return (
    <main className="flex">
      <SideBar />

      <main className="flex-1 ">
        <main className="  h-[4rem] flex justify-between items-center sticky top-0 z-50   border-b  bg-background">
          <div className="container">
            <TopHeader data={parsedData} />
          </div>
        </main>
        <div className="container mt-4">{children}</div>
      </main>
    </main>
  );
}
