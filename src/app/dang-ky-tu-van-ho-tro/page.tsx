import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/Sections";

export default function ConsultationPage() {
  return (
    <>
      <PageIntro
        eyebrow="Consultation"
        title="Request project advice from the delivery team"
        description="Use this page as the primary conversion route for ads, campaign links, and homepage calls to action."
      />
      <section className="section narrow">
        <ContactForm source="consultation" />
      </section>
    </>
  );
}
