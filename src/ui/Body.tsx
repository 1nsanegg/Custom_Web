import { getCurrentUser } from "@/auth/nextjs/currentUser";
import { cookies } from "next/headers";


export default async function Body() {


  return (
    <div className="mt-40 flex flex-col items-center">
      <h1 className="text-6xl ml-12">Welcom to this website</h1>
      <h1 className="text-3xl mt-5 ml-10">Please log in to view conent</h1>
    </div>
  );
}
