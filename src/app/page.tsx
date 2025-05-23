import Navbar from "@/ui/Navbar";
import Body from "@/ui/Body";
import InfoToggle from "@/ui/ExtraInfoBtn";



export default function Home() {
  return (
    <div className="bg-base-100 shadow-sm text-[#42B9FC]">
      <Navbar/>
      <Body/>
      <InfoToggle/>
    </div>
  );
}
