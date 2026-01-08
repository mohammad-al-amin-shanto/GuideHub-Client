import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import ClientShell from "@/components/ClientShell";

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
        <AuthProvider>
          <ClientShell>{children}</ClientShell>
        </AuthProvider>
      </body>
    </html>
  );
}
