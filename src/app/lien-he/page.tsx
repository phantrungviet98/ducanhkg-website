import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/Sections";
import { site } from "@/data/site";

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Liên hệ"
        title="Chia sẻ công trình bạn đang dự định triển khai"
        description="Thông tin liên hệ sẽ được gửi qua API route đã sẵn sàng kết nối Supabase."
      />
      <section className="section two-column">
        <div className="contact-panel">
          <h2>Văn phòng</h2>
          <p>{site.address}</p>
          <p>{site.phone}</p>
          <p>{site.email}</p>
        </div>
        <ContactForm source="contact" />
      </section>
    </>
  );
}
