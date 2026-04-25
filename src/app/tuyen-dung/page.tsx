"use client";

import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/Sections";
import { useLocale } from "@/lib/locale-context";

export default function CareersPage() {
  const { content } = useLocale();
  const page = content.pages.careers;

  return (
    <>
      <PageIntro
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
      />
      <section className="section two-column">
        <div className="check-list">
          {page.roles.map((role) => (
            <p key={role}>{role}</p>
          ))}
        </div>
        <ContactForm source="careers" title={page.formTitle} />
      </section>
    </>
  );
}
