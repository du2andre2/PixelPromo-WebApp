import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LogoutButton from "../components/LoggoutButton";
import Promotions from "./promotions";

export default async function Page() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div>
      <div>Olá, {session?.user?.name}</div>
      <div>
        <LogoutButton />
      </div>
      <div>
        <Promotions />
      </div>
    </div>
  );
}
