export type CategoryId = 'all' | 'hoodies' | 't-shirts' | 'caps' | 'sneakers' | 'accessories';

export type PageView = 'home' | 'shop' | 'product' | 'about' | 'contact' | 'care';

export type CareTopic = 'shipping' | 'returns' | 'faqs' | 'support';

export interface CategoryItem {
  id: Exclude<CategoryId, 'all'>;
  name: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: Exclude<CategoryId, 'all'>;
  price: number;
  previousPrice?: number;
  discountBadge?: string;
  rating: number;
  reviewCount: number;
  image: string;
  sizes: string[];
  color: string;
  description: string;
  featured?: boolean;
  material: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  color: string;
}
