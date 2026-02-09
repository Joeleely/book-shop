export type Banner = {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  href?: string;
};

export const banners: Banner[] = [
  {
    id: "bn1",
    title: "Mid-Year Book Fair",
    subtitle: "ลดสูงสุด 60% เฉพาะสัปดาห์นี้",
    imageUrl: "https://picsum.photos/seed/naiin-banner-1/1200/420",
    href: "/",
  },
  {
    id: "bn2",
    title: "New Arrivals",
    subtitle: "หนังสือมาใหม่ อัปเดตทุกสัปดาห์",
    imageUrl: "https://picsum.photos/seed/naiin-banner-2/1200/420",
    href: "/",
  },
  {
    id: "bn3",
    title: "Pre-Order Special",
    subtitle: "ของแถมพิเศษจำนวนจำกัด",
    imageUrl: "https://picsum.photos/seed/naiin-banner-3/1200/420",
    href: "/",
  },
  {
    id: "bn4",
    title: "Best Sellers",
    subtitle: "หนังสือขายดีที่ทุกคนกำลังอ่าน",
    imageUrl: "https://picsum.photos/seed/naiin-banner-7/1200/420",
    href: "/category/bestseller",
  },
  {
    id: "bn5",
    title: "Self-Development Picks",
    subtitle: "พัฒนาตัวเองวันละนิด เพื่อชีวิตที่ดีขึ้น",
    imageUrl: "https://picsum.photos/seed/naiin-banner-5/1200/420",
    href: "/category/self-development",
  },
];
