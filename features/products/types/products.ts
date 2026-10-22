interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isMain: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  lowStockThreshold: number;
  sku: string;
  barcode: string;
  price: number;
  oldPrice: number;
  discountPercent: number;
  stock: number;
  availableStock: number;
  reservedStock: number;
  isActive: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isPopular: boolean;
  viewsCount: number;
  averageRating: number;
  reviewsCount: number;
  brand?: {
    id: string;
    name: string;
    logo?: string;
  };
  category?: {
    id: string;
    name: string;
  };
  images?: ProductImage[];
}