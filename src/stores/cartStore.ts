import { addToCart, getCart, removeFromCart } from '@/api/cartApi';
import { Product } from '@/api/productsApi';
import { makeAutoObservable, runInAction } from 'mobx';

type cartItem = {
  product: Product;
  quantity: number;
};

class CartStore {
  private storage: Map<number, cartItem> = new Map();

  constructor() {
    makeAutoObservable(this);
  }

  // количество товаров в корзине
  get count(): number {
    let totalCount = 0;
    this.storage.forEach((item) => {
      totalCount += item.quantity;
    });
    return totalCount;
  }

  //стоимость всех товаров в корзине
  get total(): number {
    let totalPrice = 0;
    this.storage.forEach((item) => {
      const price = item.product.price ?? 0;
      totalPrice += price * item.quantity;
    });
    return totalPrice;
  }

  //Массив всех товаров корзине
  get list(): cartItem[] {
    return Array.from(this.storage.values());
  }

  // Загрузка корзины с сервера
  async fetch() {
    try {
      const response = await getCart();
      runInAction(() => {
        this.storage.clear();
        response.forEach((cartItem) => {
          this.storage.set(cartItem.product.id, {
            product: {
              id: cartItem.product.id,
              documentId: cartItem.product.documentId,
              title: cartItem.product.title,
              price: cartItem.product.price,
              images: cartItem.product.images,
              description: '',
              productCategory: undefined,
            },
            quantity: cartItem.quantity,
          });
        });
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Error loading the shopping cart: ', error);
    }
  }

  // добавление товара в корзину
  async add(product: Product, quantity: number = 1) {
    await addToCart(product.id, quantity);
    await this.fetch();
  }

  //удаление товара из корзины
  async remove(productId: number, quantity: number = 1) {
    const currentItem = this.storage.get(productId);

    if (!currentItem) {
      return; //товар не найден
    }

    await removeFromCart(productId, quantity);
    await this.fetch();
  }

  async clear() {
    const allItems = this.list;

    for (const item of allItems) {
      await removeFromCart(item.product.id, item.quantity);
    }

    await this.fetch();
  }

  isInCart(productId: number): boolean {
    return this.storage.has(productId);
  }

  getQuantity(productId: number): number {
    const item = this.storage.get(productId);
    return item?.quantity ?? 0;
  }
}

export const cartStore = new CartStore();
