import { PageIntro, Strengths } from "@/components/Sections";
import { strengths } from "@/data/site";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Về chúng tôi"
        title="Đội ngũ xây dựng đặt trọng tâm vào sự rõ ràng, trách nhiệm và chất lượng hoàn thiện"
        description="Trang này được tổ chức để sau này có thể quản lý lịch sử công ty, đội ngũ, chứng chỉ và tiêu chuẩn vận hành từ admin."
      />
      <section className="split-section">
        <Image
          className="wide-image"
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80"
          alt=""
          width={1400}
          height={920}
        />
        <div>
          <p className="eyebrow">Hồ sơ công ty</p>
          <h2>Đồng hành để gia chủ nắm rõ từng bước thi công</h2>
          <p>
            Đức Anh KG tư vấn, thiết kế và thi công trọn gói với tinh thần xây dựng tận tâm. Nội dung chi tiết có thể tiếp tục cập nhật khi có hồ sơ thương hiệu đầy đủ.
          </p>
        </div>
      </section>
      <Strengths items={strengths} />
    </>
  );
}
