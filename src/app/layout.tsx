import "@/src/styles/globals.css";
import { Navbar } from "@/src/components/Navbar";
import { AppProvider } from "@/src/lib/store";
import { Contact } from "../components/Contact";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
            <div className="min-h-screen">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Contact />
            </div>
        </AppProvider>
      </body>
    </html>
  );
}
