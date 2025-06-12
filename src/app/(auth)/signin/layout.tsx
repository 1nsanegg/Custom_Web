import "@/app/globals.css";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
       <body
        className="min-h-screen flex items-center justify-center bg-[url('/login_background.png')] bg-cover bg-center bg-carnation-400 bg-blend-overlay font-montserrat"
      >
        {children}
      </body>
    </html>
  );
}
