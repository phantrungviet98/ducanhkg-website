import type { Video } from "@/types/content";

export const videos: Record<"vi" | "en", Video[]> = {
  vi: [
    {
      slug: "gioi-thieu-duc-anh-kg",
      title: "Hành trình thiết kế và thi công cùng Đức Anh KG",
      description: "Video giới thiệu cách đội ngũ đồng hành từ ý tưởng, hồ sơ kỹ thuật đến thi công và bàn giao.",
      image: "/brand/banner.jpeg",
      href: "/VIDEO-GIOI-THIEU-WEB.mp4",
      duration: "01:00"
    }
  ],
  en: [
    {
      slug: "gioi-thieu-duc-anh-kg",
      title: "The design and build journey with Duc Anh KG",
      description: "An introduction to how the team supports a project from concept and documentation to construction and handover.",
      image: "/brand/banner.jpeg",
      href: "/VIDEO-GIOI-THIEU-WEB.mp4",
      duration: "01:00"
    }
  ]
};
