export interface BannerItem {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    mobileImage?: string;
    buttonText: string;
    link: string;
    sortOrder: number;
    isActive: boolean;
  }