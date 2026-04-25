"use client";

import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/Sections";
import { useLocale } from "@/lib/locale-context";

export default function ConsultationPage() {
  const { content } = useLocale();
  const page = content.pages.consultation;

  return (
    <>
      <PageIntro
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
      />
      <section className="section narrow">
        <ContactForm source="consultation" />
      </section>
    </>
  );
}
