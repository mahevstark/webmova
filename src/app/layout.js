import { Nunito } from "next/font/google"; // Import Nunito from Google Fonts
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "./provider/UserProvider";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "700"],
});

export const metadata = {
  title: "MOWAPAY",
  description: "MOWAPAY",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="simpledcver"
          content="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkb21haW4iOiJtb3dhcGF5LmNvbSIsImV4cCI6MTczMjY2NTYwMH0.ZH2AmfcP3jqP3SW-heJ6oSJgYE4gvfCqApWoPI_Q0JM"
        />
      </head>
      <body className={`${nunito.variable} antialiased`}>
        <UserProvider>
          {children}

          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
