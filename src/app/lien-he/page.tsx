import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/Sections";
import { site } from "@/data/site";

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Tell us what you are planning"
        description="Lead submissions are sent through the Supabase-ready API route."
      />
      <section className="section two-column">
        <div className="contact-panel">
          <h2>Office</h2>
          <p>{site.address}</p>
          <p>{site.phone}</p>
          <p>{site.email}</p>
        </div>
        <ContactForm source="contact" />
      </section>
    </>
  );
}
