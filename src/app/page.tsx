import { redirect } from "next/navigation";
import { cookieData } from "./actions";

export default async function Home() {
  const data = await cookieData();
  if (!data) {
    redirect("/login");
  }

  return <main>one</main>;
}
