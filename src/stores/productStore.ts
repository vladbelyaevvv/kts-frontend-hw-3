import { getProductById, getRelatedProducts, Product } from '@api/productsApi';
import { action, makeObservable, observable, runInAction } from 'mobx';
import { LoadingStageModel } from './LoadingStageModel';

export class ProductStore {
  product: Product | null = null;
  relatedProducts: Product[] = [];

  productMeta = new LoadingStageModel();
  relatedMeta = new LoadingStageModel();

  constructor() {
    makeObservable(this, {
      product: observable,
      relatedProducts: observable,
      productMeta: observable,
      relatedMeta: observable,
      fetchProduct: action,
      fetchRelatedProducts: action,
      init: action,
      setProduct: action,
      clear: action,
    });
  }

  //загрузка только товара
  async fetchProduct(documentId: string) {
    if (!documentId) {
      return;
    }
    this.productMeta.start();

    try {
      const data = await getProductById(documentId);
      runInAction(() => {
        this.product = data;
        this.productMeta.success();
      });
      return data;
    } catch (err) {
      this.productMeta.error('Ошибка при загрузке товара');
      return null;
    }
  }

  // загрузка только связанных товаров
  async fetchRelatedProducts(productId: number, categoryId: number){
    this.relatedMeta.start();

    try {
      const related = await getRelatedProducts(categoryId, productId);
      runInAction(() => {
        this.relatedProducts = related;
        this.relatedMeta.success();
      });
    } catch(err) {
      this.relatedMeta.error('Не удалось загрузить похожие товары');
    }
  }

  async init(documentId: string, initialProduct?: Product, initialRelatedProducts?: Product[]) {
    // если есть начальные данные с сервера - используем их
    if (initialProduct) {
      this.setProduct(initialProduct);
      this.productMeta.success();
      
      // загрузка только связанных товаров
      if (initialRelatedProducts && initialRelatedProducts.length > 0) {
        this.relatedProducts = initialRelatedProducts;
        this.relatedMeta.success();
      } else if (initialProduct.productCategory?.id) {
        // иначе загружаем связанные товары на клиенте
        this.fetchRelatedProducts(initialProduct.id, initialProduct.productCategory.id);
      }
    } else {
      const product = await this.fetchProduct(documentId);

      if (product?.productCategory?.id) {
        this.fetchRelatedProducts(product.id, product.productCategory.id);
      }
    }
  }

  // для серверной загрузки
  setProduct(product: Product) {
    this.product = product;
  }

  clear() {
    this.product = null;
    this.relatedProducts = [];
    this.productMeta.reset();
    this.relatedMeta.reset();
  }
}
