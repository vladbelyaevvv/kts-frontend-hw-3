import { getProductById, getRelatedProducts, Product } from '@api/productsApi';
import { makeAutoObservable, runInAction } from 'mobx';

class ProductStore {
  product: Product | null = null;
  relatedProducts: Product[] = [];
  loading = false;
  error = '';

  constructor() {
    makeAutoObservable(this);
  }

  async fetchProduct(documentId: string) {
    if (!documentId) {
      return;
    }

    try {
      runInAction(() => {
        this.loading = true;
        this.error = '';
      });
      const data = await getProductById(documentId);
      runInAction(() => {
        this.product = data;
      });

      if (data.productCategory?.id) {
        const related = await getRelatedProducts(
          data.productCategory.id,
          data.id
        );
        runInAction(() => {
          this.relatedProducts = related;
        });
      }
    } catch (err) {
      runInAction(() => {
        this.error = 'Ошибка при загрузке товара';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  clear() {
    runInAction(() => {
      this.product = null;
      this.relatedProducts = [];
      this.loading = false;
      this.error = '';
    });
  }
}

export const productStore = new ProductStore();
