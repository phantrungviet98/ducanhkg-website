import type { Metadata } from "next";
import { ConditionalFooter } from "@/components/ConditionalFooter";
import { Header } from "@/components/Header";
import { StickyActions } from "@/components/StickyActions";
import { site } from "@/data/site";
import { LocaleProvider } from "@/lib/locale-context";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name} | ${site.tagline}`,
  description: "Đức Anh KG tư vấn, thiết kế và thi công trọn gói tại Kiên Giang."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" data-scroll-behavior="smooth">
      <body>
        <LocaleProvider>
          <Header />
          <main>{children}</main>
          <ConditionalFooter />
          <StickyActions />
        </LocaleProvider>
      </body>
    </html>
  );
}
