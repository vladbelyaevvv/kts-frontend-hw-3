import {
  Category,
  getCategories,
  getProducts,
  GetProductsParams,
  Product,
} from '@api/productsApi';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { LoadingStageModel } from './loadingState';
import { Option } from '@/components/MultiDropdown';

const PAGE_SIZE = 9; // кол-во товаров на одной странице

export class ProductsStore {
  products: Product[] = []; //список загруженных товаров
  total = 0;// общее кол-во товаров с учетом фильтров
  search = '';//поисковой запрос
  selectedCategoryIds: number[] = [];//выбранные фильтрующие категории (их ID)
  isRestored = false; // восстановлено ли состояние из URL 

  categories: Category[] = [];//список всех категорий
  categoriesMeta = new LoadingStageModel();//Статус загрузки категорий (loading/success/error)
  productsMeta = new LoadingStageModel();//Статус загрузки товаров (loading/success/error)

  currentPage = 1;// текущая страница пагинации

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
      selectedCategories: computed,
      setSearch: action,
      setSelectedCategoryIds: action,
      fetchCategories: action,
      fetchProducts: action,
      loadMore: action,
      clear: action,
    });
  }

  //установить поисковой запрос
  setSearch(value: string) {
    this.search = value;
  }

  //установить выбранные категории по ID
  setSelectedCategoryIds(ids: number[]) {
    this.selectedCategoryIds = ids;
  }

  // Установить флаг восстановления из URL 
  setIsRestored(value: boolean) {
    this.isRestored = value;
  }

  //Чтобы в UI мультидропдауна отображались категории(ID преобразует в Option[])
  get selectedCategories(): Option[] {
    return this.selectedCategoryIds
      .map((id) => {
        const category = this.categories.find((categ) => categ.id === id);
        return category ? { key: String(id), value: category.title } : null;
      })
      .filter((opt): opt is Option => opt !== null);
  }

  //Загрузить список категорий с сервера 
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

  //загрузить товары с сервера
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

  //загрузить следующую страницу товаров (кнопка showMore)
  async loadMore() {
    if (!this.hasMore) {
      return;
    }

    this.currentPage += 1;
    await this.fetchProducts(true);
  }

  // восстановление состояния стора из url параметров - извлекаеn search и categories из URL и устанавливает в стор
  restoreFromUrl(searchParams: URLSearchParams) {
    const searchFromUrl = searchParams.get('search') ?? '';
    const categoriesFromUrl =
      searchParams.get('categories')?.split(',').filter(Boolean).map(Number) ?? [];

    this.search = searchFromUrl;
    this.selectedCategoryIds = categoriesFromUrl;
    this.isRestored = true;

    return {
      search: searchFromUrl,
      categoryIds: categoriesFromUrl,
    };
  }

  //из текущего состояния стора создает URLSearchParams(то есть обновляет URL при применении фильтров)
  toUrlSearchParams(): URLSearchParams {
    const params = new URLSearchParams();
    if (this.search) {
      params.set('search', this.search);
    }
    if (this.selectedCategoryIds.length > 0) {
      params.set('categories', this.selectedCategoryIds.join(','));
    }
    return params;
  }

  clear() {
    this.products = [];
    this.total = 0;
    this.search = '';
    this.selectedCategoryIds = [];
    this.currentPage = 1;
    this.isRestored = false;
    this.categoriesMeta.reset();
    this.productsMeta.reset();
  }
}