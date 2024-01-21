import { Payment, columns } from "./columns";
import { DataTable } from "./table";

export default async function Table({ data }: { data: Payment[] }) {
  return (
    <div className=" py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
