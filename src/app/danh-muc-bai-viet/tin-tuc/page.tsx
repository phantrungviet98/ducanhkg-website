import { ArticleGrid, PageIntro } from "@/components/Sections";
import { articles } from "@/data/site";

export default function NewsPage() {
  return (
    <section className="section">
      <PageIntro
        eyebrow="Tin tức"
        title="Cập nhật công ty và ghi chú lập kế hoạch xây dựng"
        description="Cấu trúc tin tức hỗ trợ chuyên mục, tác giả, trạng thái xuất bản, SEO và ảnh đại diện trong admin sau này."
      />
      <ArticleGrid items={articles} />
    </section>
  );
}
