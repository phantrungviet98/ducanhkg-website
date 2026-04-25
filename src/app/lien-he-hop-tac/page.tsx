import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/Sections";

export default function CooperationPage() {
  return (
    <>
      <PageIntro
        eyebrow="Partnership"
        title="Supplier, contractor, and partner cooperation"
        description="This route is ready for partnership enquiries and can later include supplier onboarding fields."
      />
      <section className="section narrow">
        <ContactForm source="cooperation" title="Send cooperation request" />
      </section>
    </>
  );
}
