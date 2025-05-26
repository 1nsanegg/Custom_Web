import Navbar from "@/ui/Navbar";
import Body from "@/ui/Body";
import InfoToggle from "@/ui/LoginButton";
import { getCurrentUser } from "@/auth/nextjs/currentUser";



export default async function Home() {
  const user = await getCurrentUser()
  console.log(user)
  return (
    <div className="bg-base-100 shadow-sm text-[#42B9FC]">
      <Body/>
      <InfoToggle/>
    </div>
  );
}
