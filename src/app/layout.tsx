import type { Metadata } from "next";
import { Analytics } from "@/components/Analytics";
import { ConditionalFooter } from "@/components/ConditionalFooter";
import { Header } from "@/components/Header";
import { StickyActions } from "@/components/StickyActions";
import { site } from "@/data/site";
import { LocaleProvider } from "@/lib/locale-context";
import { safeJsonLd } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`
  },
  description: "Đức Anh KG tư vấn, thiết kế và thi công trọn gói tại Kiên Giang.",
  applicationName: site.name,
  keywords: ["Đức Anh KG", "thiết kế nhà Kiên Giang", "thi công trọn gói", "xây nhà Rạch Giá"],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: "Đức Anh KG tư vấn, thiết kế và thi công trọn gói tại Kiên Giang.",
    images: [{ url: site.banner, alt: `${site.name} — ${site.tagline}` }]
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: "Đức Anh KG tư vấn, thiết kế và thi công trọn gói tại Kiên Giang.",
    images: [site.banner]
  },
  icons: {
    icon: site.logo,
    apple: site.logo
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: site.name,
    url: site.url,
    logo: `${site.url}${site.logo}`,
    image: `${site.url}${site.banner}`,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1055 Lâm Quang Ky, P. An Hòa",
      addressLocality: "Rạch Giá",
      addressRegion: "Kiên Giang",
      addressCountry: "VN"
    }
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/tim-kiem?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="vi" data-scroll-behavior="smooth">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd([organizationJsonLd, websiteJsonLd]) }} />
        <LocaleProvider>
          <Header />
          <main>{children}</main>
          <ConditionalFooter />
          <StickyActions />
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
