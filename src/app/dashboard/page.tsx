import { Customer } from "@/models";
import { cookieData } from "../actions";
import Sliders from "@/components/Sliders";
import { cookies } from "next/headers";
import Table from "../data-table/page";
import { Payment } from "../data-table/columns";

const Overview = async () => {
  let parsedData;
  const userData = await cookieData();
  if (userData) {
    parsedData = JSON.parse(userData) as Customer;
  }

  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  const sliderData = JSON.parse(cookies().get("payees")?.value || "");

  return (
    <div>
      <h1 className=" text-xl font-bold">Dashboard</h1>
      <div>
        <div className=" mt-10 grid  grid-cols-12  ">
          <div className="  col-span-8">
            <h1>Balance Details</h1>
            <div className="flex mt-5 ">
              <div className="flex-1   bg-[#E4EDE7] dark:text-gray-600 relative before:content-[''] before:absolute before:w-[50%] before:h-full before:top-0 before:right-0 before:bg-[#84B897]  before:rounded-r-md  px-7 py-8 rounded-md">
                <p className=" text-xs">Your Balance</p>
                <p className=" py-2 font-bold text-2xl">
                  {formatter.format(parsedData?.accountBalance || 0)}
                </p>
                <p className=" text-xs mt-2">
                  {parsedData?.transactionHistory?.transactions.length ?? "No"}{" "}
                  Transactions
                </p>
              </div>
            </div>
          </div>
          <div className=" col-span-4"></div>
        </div>
        <div className="mt-10 grid   grid-cols-12">
          <div className="  col-span-8">
            <h1>Top Customers</h1>
            <Sliders sliderData={sliderData} parsedData={parsedData} />
          </div>
        </div>

        <div className="mt-10 grid   grid-cols-12">
          <div className="col-span-8">
            <h1>Transaction</h1>
            <Table data={parsedData?.transactionHistory?.transactions as any} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
