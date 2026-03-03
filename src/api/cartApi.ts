import api from './axios';

export type CartItem = {
  id: number;
  product: {
    id: number;
    documentId: string;
    title: string;
    price: number;
    images?: { url: string }[];
  };
  quantity: number;
};

export type CartResponse = {
  data: CartItem[];
};

export const getCart = async () => {
  const response = await api.get<CartItem[]>('/cart');
  return response.data;
};

export const addToCart = async (product: number, quantity: number = 1) => {
  const response = await api.post<CartResponse>('/cart/add', {
    product,
    quantity,
  });
  return response.data;
};

export const removeFromCart = async (product: number, quantity: number = 1) => {
  const response = await api.post<CartResponse>('/cart/remove', {
    product,
    quantity,
  });
  return response.data;
};
