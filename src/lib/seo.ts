import type { Metadata } from "next";
import { site } from "@/data/site";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

export function createMetadata({ title, description, path, image = site.banner, noIndex = false }: SeoInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "vi_VN",
      siteName: site.name,
      title,
      description,
      url: path,
      images: [{ url: image, alt: title }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    },
    robots: noIndex ? { index: false, follow: true } : undefined
  };
}

export function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
