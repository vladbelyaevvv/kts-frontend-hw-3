import {
  Category,
  getCategories,
  getProducts,
  GetProductsParams,
  Product,
} from '@api/productsApi';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { LoadingStageModel } from './loadingState';

const PAGE_SIZE = 9;

export class ProductsStore {
  products: Product[] = [];
  total = 0;
  search = '';
  selectedCategoryIds: number[] = [];

  categories: Category[] = [];
  categoriesMeta = new LoadingStageModel();
  productsMeta = new LoadingStageModel();

  currentPage = 1;

  constructor() {
    makeObservable(this, {
      products: observable,
      productsMeta: observable,
      total: observable,
      search: observable,
      selectedCategoryIds: observable,
      categories: observable,
      categoriesMeta: observable,
      currentPage: observable,
      hasMore: computed,
      setSearch: action,
      setCategories: action,
      fetchCategories: action,
      fetchProducts: action,
      loadMore: action,
      clear: action,
    });
  }

  setSearch(value: string) {
    this.search = value;
  }

  setCategories(ids: number[]) {
    this.selectedCategoryIds = ids;
  }

  async fetchCategories() {
    this.categoriesMeta.start();

    try {
      const data = await getCategories();
      runInAction(() => {
        this.categories = data.data;
        this.categoriesMeta.success();
      })
    } catch (err) {
        this.categoriesMeta.error('Не удалось загрузить категории');
    }
  }

  // есть ли еще страницы
  get hasMore() {
    const totalPages = Math.ceil(this.total / PAGE_SIZE);
    return this.currentPage < totalPages;
  }

  async fetchProducts(append = false) {
    if (!append) {
      this.productsMeta.start();
      this.currentPage = 1;
      this.products = [];
    }

    try {
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

      runInAction(() => {
        if (append) {
          this.products = [...this.products, ...data.data];
        } else {
          this.products = data.data;
        }
        this.total = data.meta.pagination.total;
        this.productsMeta.success();
      })

    } catch (err) {
        this.productsMeta.error('Не удалось загрузить товары');
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
    this.products = [];
    this.total = 0;
    this.search = '';
    this.selectedCategoryIds = [];
    this.currentPage = 1;
    this.categoriesMeta.reset();
    this.productsMeta.reset();
  }
}