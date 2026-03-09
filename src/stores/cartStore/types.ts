import { Product } from '@api/productsApi';

export type CartItem = {
  product: Product;
  quantity: number;
};

export type CartItemResponse = {
  product: {
    id: number;
    documentId: string;
    title: string;
    price: number;
    images?: { url: string }[];
  };
  quantity: number;
};
