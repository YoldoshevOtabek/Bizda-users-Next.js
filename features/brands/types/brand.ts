export interface Brand {
    id: string;
    name: string;
    slug: string;
    description: string;
    logo: string;
    isActive: boolean;
    _count: {
    products: number;
    };
    }