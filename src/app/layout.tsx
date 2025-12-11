import "./globals.css";
import ClientShell from "../components/ClientShell";

export const metadata = {
  title: "Local Guide Platform",
  description: "Connect with local guides",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* ClientShell handles Navbar, Footer, ToastContainer on the client */}
        <ClientShell>
          <main className="min-h-[70vh]">{children}</main>
        </ClientShell>
      </body>
    </html>
  );
}
