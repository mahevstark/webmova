import { Nunito } from "next/font/google"; // Import Nunito from Google Fonts
import "./globals.css";
import { Toaster } from "sonner";
import { UserProvider } from "./provider/UserProvider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { cookies } from "next/headers";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "700"],
});

export const metadata = {
  title: "MOWAPAY",
  description: "MOWAPAY",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("MYNEXTAPP_LOCALE")?.value;
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <head>
        <meta
          name="simpledcver"
          content="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkb21haW4iOiJtb3dhcGF5LmNvbSIsImV4cCI6MTczMjY2NTYwMH0.ZH2AmfcP3jqP3SW-heJ6oSJgYE4gvfCqApWoPI_Q0JM"
        />
      </head>
      <body className={`${nunito.variable} antialiased`}>
        <UserProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>

          <Toaster />
        </UserProvider>
      </body>
    </html>
  );
}
