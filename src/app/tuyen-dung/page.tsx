import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/Sections";

export default function CareersPage() {
  return (
    <>
      <PageIntro
        eyebrow="Tuyển dụng"
        title="Gia nhập đội ngũ coi trọng kỷ luật công trường"
        description="Danh sách tuyển dụng sau này có thể lấy từ Supabase với vị trí, địa điểm và trạng thái ứng tuyển."
      />
      <section className="section two-column">
        <div className="check-list">
          <p>Kỹ sư hiện trường</p>
          <p>Dự toán khối lượng</p>
          <p>Điều phối vật tư</p>
          <p>Giám sát công trình</p>
        </div>
        <ContactForm source="careers" title="Gửi thông tin ứng tuyển" />
      </section>
    </>
  );
}
