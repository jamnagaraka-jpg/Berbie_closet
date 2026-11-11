export interface Product {
  id: number;
  name: string;
  category: string;
  note: string;
  sizes?: string;
  price?: number;
  ig: string;
  image: string;
  instagramUrl: string;
}

export const WHATSAPP_PHONE = '2347030107401';
export const DISPLAY_PHONE = '+234 703 010 7401';
export const INSTAGRAM_URL = 'https://www.instagram.com/berbiecloset?dlrf=ODZiajFpN3gyOGZr';
export const TIKTOK_URL = 'https://www.tiktok.com/@berbiecloset?_r=1&_t=ZS-9BEc3LLAMEb';

const IG_BASE = 'https://www.instagram.com/reel/';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Everyday Statement Look',
    category: 'OUTFITS',
    note: 'Outfit available in sizes 10–16',
    sizes: '10–16',
    ig: 'DdHVCugAzyx',
    image: '/instagram-collection/look-01.jpg',
    instagramUrl: `${IG_BASE}DdHVCugAzyx/`
  },
  {
    id: 2,
    name: 'Printed Jacket',
    category: 'JACKETS',
    note: 'Printed jacket',
    sizes: '10–14',
    ig: 'DdHVf2BAh3R',
    image: '/instagram-collection/look-02.jpg',
    instagramUrl: `${IG_BASE}DdHVf2BAh3R/`
  },
  {
    id: 3,
    name: 'Denim Jeans 01',
    category: 'DENIM',
    note: 'Jeans',
    sizes: '10–18',
    ig: 'DdZKMw9AUkE',
    image: '/instagram-collection/look-03.jpg',
    instagramUrl: `${IG_BASE}DdZKMw9AUkE/`
  },
  {
    id: 4,
    name: 'Denim Jeans 02',
    category: 'DENIM',
    note: 'Jeans',
    sizes: '10–14',
    ig: 'DdZMQpZAGoJ',
    image: '/instagram-collection/look-04.jpg',
    instagramUrl: `${IG_BASE}DdZMQpZAGoJ/`
  },
  {
    id: 5,
    name: 'Classic Shirt',
    category: 'TOPS',
    note: 'Shirt',
    sizes: '10–14',
    ig: 'DdZMeI-A-Kt',
    image: '/instagram-collection/look-05.jpg',
    instagramUrl: `${IG_BASE}DdZMeI-A-Kt/`
  },
  {
    id: 6,
    name: 'Signature Outfit',
    category: 'OUTFITS',
    note: 'Ready-to-wear look',
    sizes: '10–14',
    ig: 'DdZMpblAtXp',
    image: '/instagram-collection/look-06.jpg',
    instagramUrl: `${IG_BASE}DdZMpblAtXp/`
  },
  {
    id: 7,
    name: 'Denim Jeans 03',
    category: 'DENIM',
    note: 'Jeans',
    sizes: '10–14',
    ig: 'DdZk4oWAT5m',
    image: '/instagram-collection/look-07.jpg',
    instagramUrl: `${IG_BASE}DdZk4oWAT5m/`
  },
  {
    id: 8,
    name: 'Short Set',
    category: 'CO-ORDS',
    note: 'Two-piece short set',
    sizes: '10–14',
    ig: 'DdbkHY4hZt5',
    image: '/instagram-collection/look-08.jpg',
    instagramUrl: `${IG_BASE}DdbkHY4hZt5/`
  },
  {
    id: 9,
    name: 'Beaded Two-Piece',
    category: 'CO-ORDS',
    price: 75000,
    note: 'Beautiful beaded two-piece',
    sizes: '10–14',
    ig: 'Dev2d0DgUAp',
    image: '/instagram-collection/look-09.jpg',
    instagramUrl: `${IG_BASE}Dev2d0DgUAp/`
  }
];

export const formatPrice = (price?: number): string => {
  if (typeof price === 'number') {
    return '₦' + price.toLocaleString('en-NG');
  }
  return 'Price on request';
};

export const getWhatsAppUrl = (text: string): string => {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
};

export const createProductEnquiryUrl = (product: Product): string => {
  const message = `Hello BERBIECLOSET, I would like to make an enquiry about the ${product.name}. Is it available? Please share the available sizes and confirm the price.`;
  return getWhatsAppUrl(message);
};
