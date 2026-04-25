import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/Sections";

export default function ConsultationPage() {
  return (
    <>
      <PageIntro
        eyebrow="Tư vấn"
        title="Đăng ký tư vấn từ đội ngũ Đức Anh KG"
        description="Trang này dùng làm luồng chuyển đổi chính cho quảng cáo, chiến dịch và lời kêu gọi hành động trên trang chủ."
      />
      <section className="section narrow">
        <ContactForm source="consultation" />
      </section>
    </>
  );
}
