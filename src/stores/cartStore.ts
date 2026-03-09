import { addToCart, getCart, removeFromCart } from '@api/cartApi';
import { Product } from '@api/productsApi';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';

type cartItem = {
  product: Product;
  quantity: number;
};

type CartItemResponse = {
  product: {
    id: number;
    documentId: string;
    title: string;
    price: number;
    images?: { url: string}[];
  };
  quantity: number;
}

export class CartStore {
  private storage = observable.map<number, cartItem>();

  constructor() {
    makeObservable(this, {
      count: computed,
      total: computed,
      list: computed,
      fetch: action,
      add: action,
      remove: action,
      clear: action,
    });
  }

  private normalizeCartItem(item: CartItemResponse): cartItem {
    return {
      product: {
        id: item.product.id,
        documentId: item.product.documentId,
        title: item.product.title,
        price: item.product.price,
        images: item.product.images,
      },
      quantity: item.quantity,
    }
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
          const normalized = this.normalizeCartItem(cartItem);
          this.storage.set(cartItem.product.id, normalized);
        });
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Error loading the shopping cart: ', error);
    }
  }

  // добавление товара в корзину
  async add(product: Product, quantity: number = 1) {
    const existingItem = this.storage.get(product.id);

    if(existingItem){
      // если товар уже существует то прибавляем кол-во
      existingItem.quantity += quantity;
    } else {
      //если товара еще нет - то добавляем новый
      this.storage.set(product.id, {
        product: {
          id: product.id,
          documentId: product.documentId,
          title: product.title,
          price: product.price,
          images: product.images,
        },
        quantity,
      })
    }
    await addToCart(product.id, quantity);
  }

  //удаление товара из корзины
  async remove(productId: number, quantity: number = 1) {
    const currentItem = this.storage.get(productId);

    if (!currentItem) {
      return; //товар не найден
    }

    if (currentItem.quantity > quantity){
      currentItem.quantity -= quantity;
    } else {
      this.storage.delete(productId);
    }
    await removeFromCart(productId, quantity);
  }

  async clear() {
    const allItems = this.list;
    this.storage.clear();

    for (const item of allItems) {
      await removeFromCart(item.product.id, item.quantity);
    }
  }

  isInCart(productId: number): boolean {
    return this.storage.has(productId);
  }

  getQuantity(productId: number): number {
    const item = this.storage.get(productId);
    return item?.quantity ?? 0;
  }
}
