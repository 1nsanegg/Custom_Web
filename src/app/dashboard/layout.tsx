import "@/app/globals.css";
import NewNavbar from "@/ui/NewNavbar";
import Menu from "@/ui/Menu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-hidden">
      <body className="font-montserrat overflow-hidden m-0 p-0 box-border">
        {/* Navbar - fixed top full width */}
        <div className="fixed top-0 left-0 w-full z-50 h-16">
          <NewNavbar />
        </div>

        {/* Sidebar - fixed to the left below navbar */}
        <div className="fixed top-[64px] left-0 w-1/4 h-[calc(100vh-64px)] z-40 overflow-hidden">
          <Menu />
        </div>

        {/* Main Content - scrollable, no overflow-x */}
        <main className="absolute top-[64px] left-1/4 w-3/4 h-[calc(100vh-64px)] overflow-y-auto overflow-x-hidden bg-blue-50 ">
          {children}
        </main>
      </body>
    </html>
  );
}
