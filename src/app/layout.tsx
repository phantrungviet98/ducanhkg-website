import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name} | ${site.tagline}`,
  description: "Structured construction delivery for residential and commercial projects in Vietnam."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <div className="sticky-actions">
          <a href={`tel:${site.phone.replaceAll(" ", "")}`}>Call</a>
          <a href={site.zalo}>Zalo</a>
        </div>
      </body>
    </html>
  );
}
