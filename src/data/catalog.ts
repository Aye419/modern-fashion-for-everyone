import { CategoryItem, Product } from '../types/store';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'hoodies',
    name: 'Hoodies',
    image: '/images/cat_hoodies.png',
  },
  {
    id: 't-shirts',
    name: 'T-Shirts',
    image: '/images/cat_tshirts.png',
  },
  {
    id: 'caps',
    name: 'Caps',
    image: '/images/cat_caps.png',
  },
  {
    id: 'sneakers',
    name: 'Sneakers',
    image: '/images/cat_sneakers.png',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: '/images/cat_accessories.png',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'classic-hoodie',
    name: 'Classic Hoodie',
    category: 'hoodies',
    price: 39.99,
    previousPrice: 49.99,
    discountBadge: '-20%',
    rating: 5,
    reviewCount: 124,
    image: '/images/prod_hoodie.png',
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Jet Black',
    material: '420gsm Organic Brushed Fleece',
    description:
      'Cut in a relaxed modern silhouette from heavyweight organic brushed cotton fleece. Features a double-lined hood, tonal chest embroidery, and structured rib cuffs.',
    featured: true,
  },
  {
    id: 'graphic-t-shirt',
    name: 'Graphic T-Shirt',
    category: 't-shirts',
    price: 24.99,
    rating: 5,
    reviewCount: 98,
    image: '/images/prod_tshirt.png',
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Crisp White',
    material: '240gsm Combed Jersey Cotton',
    description:
      'Everyday heavyweight tee crafted from combed ringspun cotton with the signature HARUNA slanted H emblem across the chest and a clean structured collar.',
    featured: true,
  },
  {
    id: 'classic-cap',
    name: 'Classic Cap',
    category: 'caps',
    price: 19.99,
    rating: 5,
    reviewCount: 76,
    image: '/images/prod_cap.png',
    sizes: ['One Size'],
    color: 'Obsidian Black',
    material: '100% Brushed Cotton Twill',
    description:
      'Six-panel structured crown with crisp raised white H embroidery, curved brim, tonal stitched eyelets, and an adjustable matte metal strap closure.',
    featured: true,
  },
  {
    id: 'running-shoes',
    name: 'Running Shoes',
    category: 'sneakers',
    price: 64.99,
    rating: 5,
    reviewCount: 112,
    image: '/images/prod_sneaker.png',
    sizes: ['US 8', 'US 9', 'US 10', 'US 11'],
    color: 'Black / White',
    material: 'Full-Grain Leather & Cushioned Cupsole',
    description:
      'High-contrast court-inspired sneakers built with smooth black and white leather overlays, perforated toe box for breathability, and high-rebound cushioned sole.',
    featured: true,
  },
  {
    id: 'signature-sunglasses',
    name: 'Classic Matte Sunglasses',
    category: 'accessories',
    price: 29.99,
    rating: 5,
    reviewCount: 64,
    image: '/images/cat_accessories.png',
    sizes: ['One Size'],
    color: 'Matte Black',
    material: 'Bio-Acetate Frame · UV400 Polarized',
    description:
      'Timeless square-profile frames crafted from lightweight matte acetate with polarized smoke lenses providing 100% UVA/UVB protection.',
    featured: false,
  },
  {
    id: 'essential-pullover-hoodie',
    name: 'Essential Studio Hoodie',
    category: 'hoodies',
    price: 44.99,
    rating: 5,
    reviewCount: 53,
    image: '/images/cat_hoodies.png',
    sizes: ['S', 'M', 'L', 'XL'],
    color: 'Carbon Black',
    material: '400gsm French Terry Cotton',
    description:
      'Clean dropped-shoulder studio hoodie engineered for year-round layering with concealed kangaroo pocket seams and soft enzyme-washed finish.',
    featured: false,
  },
];
