import { getBanners } from "@/services/bannerService";
import { BannerItem } from "./types/type";
import BannerCarousel from "./BannerCarousel";



export default async function Banner() {
  try {
    const response = await getBanners();

    const items: BannerItem[] = Array.isArray(response)
      ? response
      : Array.isArray(response?.data)
        ? response.data
        : [];

    const banners = items
      .filter((banner) => banner.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder);

    if (banners.length === 0) {
      return null;
    }

    return <BannerCarousel banners={banners} />;
  } catch (error) {
    console.error("Bannerlarni olishda xatolik:", error);
    return null;
  }
}