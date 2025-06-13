import "@/app/globals.css";
import NewNavbar from "@/ui/NewNavbar";
import Menu from "@/ui/Menu";
import ToDoList from "@/ui/ToDoList";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-montserrat">
        <NewNavbar />
        <div className="relative w-full">
          <div className="absolute top-0 left-0 w-1/4 h-full">
            <Menu />
          </div>
          <div className="absolute top-0 right-0 w-3/4 bg-blue-50">{children}</div>
        </div>
      </body>
    </html>
  );
}
