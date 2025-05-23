import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { cookies } from "next/headers";

export default async function Body() {
const fullUser =  await getCurrentUser()

  return (
    <div className="mt-40 ">
      <h1 className="text-xl ml-12">Welcom to this website</h1>
      <h1 className="text-6xl mt-5 ml-10">User: {fullUser?.id}</h1>
      <h1 className="text-xl mt-5 ml-12">Role: {fullUser?.role}</h1>
    </div>
  );
}
