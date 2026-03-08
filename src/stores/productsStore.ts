import {
  Category,
  getCategories,
  getProducts,
  GetProductsParams,
  Product,
} from '@api/productsApi';
import { makeAutoObservable, runInAction } from 'mobx';

const PAGE_SIZE = 9;

class ProductsStore {
  products: Product[] = [];
  loading = false;
  error = '';
  total = 0;
  search = '';
  selectedCategoryIds: number[] = [];

  categories: Category[] = [];
  categoriesLoading = false;
  categoriesError = '';

  currentPage = 1;

  constructor() {
    makeAutoObservable(this);
  }

  setSearch(value: string) {
    this.search = value;
  }

  setCategories(ids: number[]) {
    this.selectedCategoryIds = ids;
  }

  async fetchCategories() {
    try {
      runInAction(() => {
        this.categoriesLoading = true;
        this.categoriesError = '';
      });
      const data = await getCategories();
      runInAction(() => {
        this.categories = data.data;
      });
    } catch (err) {
      runInAction(() => {
        this.categoriesError = 'Ошибка при загрузке категорий';
      });
    } finally {
      runInAction(() => {
        this.categoriesLoading = false;
      });
    }
  }

  // есть ли еще страницы
  get hasMore() {
    const totalPages = Math.ceil(this.total / PAGE_SIZE);
    return this.currentPage < totalPages;
  }

  async fetchProducts(append = false) {
    try {
      if (!append) {
        runInAction(() => {
          this.loading = true;
          this.currentPage = 1;
          this.products = [];
        });
      }

      this.error = '';

      const params: GetProductsParams = {
        page: this.currentPage,
        pageSize: PAGE_SIZE,
        search: this.search || undefined,
        categoryIds:
          this.selectedCategoryIds.length > 0
            ? this.selectedCategoryIds
            : undefined,
      };

      const data = await getProducts(params);

      if (append) {
        runInAction(() => {
          this.products = [...this.products, ...data.data];
        });
      } else {
        runInAction(() => {
          this.products = data.data;
        });
      }

      runInAction(() => {
        this.total = data.meta.pagination.total;
      });
    } catch (err) {
      runInAction(() => {
        this.error = 'Ошибка при загрузке товаров';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async loadMore() {
    if (!this.hasMore) {
      return;
    }

    this.currentPage += 1;
    await this.fetchProducts(true);
  }

  clear() {
    runInAction(() => {
      this.products = [];
      this.loading = false;
      this.error = '';
      this.total = 0;
      this.search = '';
      this.selectedCategoryIds = [];
      this.currentPage = 1;
    });
  }
}

export const productsStore = new ProductsStore();
