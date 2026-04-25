"use client";

import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/Sections";
import { site } from "@/data/site";
import { useLocale } from "@/lib/locale-context";

export default function ContactPage() {
  const { content } = useLocale();
  const page = content.pages.contact;

  return (
    <>
      <PageIntro
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
      />
      <section className="section two-column">
        <div className="contact-panel">
          <h2>{page.office}</h2>
          <p>{site.address}</p>
          <p>{site.phone}</p>
          <p>{site.email}</p>
        </div>
        <ContactForm source="contact" />
      </section>
    </>
  );
}
