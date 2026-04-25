import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/Sections";

export default function CooperationPage() {
  return (
    <>
      <PageIntro
        eyebrow="Hợp tác"
        title="Hợp tác nhà cung cấp, thầu phụ và đối tác"
        description="Trang này sẵn sàng nhận thông tin hợp tác và sau này có thể mở rộng thêm các trường onboarding nhà cung cấp."
      />
      <section className="section narrow">
        <ContactForm source="cooperation" title="Gửi thông tin hợp tác" />
      </section>
    </>
  );
}
