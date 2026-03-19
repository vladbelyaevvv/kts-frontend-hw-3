import {
  Category,
  getCategories,
  getProducts,
  GetProductsParams,
  Product,
  SortOrder,
} from '@api/productsApi';
import {
  action,
  computed,
  IObservableArray,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { LoadingStageModel } from './LoadingStageModel';
import { Option } from '@/components/MultiDropdown';
import queryString from 'query-string';

const PAGE_SIZE = 9; // кол-во товаров на одной странице

export class ProductsStore {
  products: Product[] = []; //список загруженных товаров
  total = 0; // общее кол-во товаров с учетом фильтров
  search = ''; //поисковой запрос
  selectedCategoryIds: IObservableArray<number> = observable.array([]); //выбранные фильтрующие категории (их ID)
  isRestored = false; // восстановлено ли состояние из URL
  sortOrder: SortOrder | undefined = undefined;

  categories: IObservableArray<Category> = observable.array([]); //список всех категорий
  categoriesMeta = new LoadingStageModel(); //Статус загрузки категорий (loading/success/error)
  productsMeta = new LoadingStageModel(); //Статус загрузки товаров (loading/success/error)

  currentPage = 1; // текущая страница пагинации

  constructor() {
    makeObservable(this, {
      products: observable,
      productsMeta: observable,
      total: observable,
      search: observable,
      selectedCategoryIds: observable,
      isRestored: observable,
      categories: observable,
      categoriesMeta: observable,
      currentPage: observable,
      sortOrder: observable,
      hasMore: computed,
      selectedCategories: computed,
      setSearch: action,
      setSelectedCategoryIds: action,
      setSort: action,
      clearSort: action,
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
    this.selectedCategoryIds.replace(ids);
  }

  setSort(order: SortOrder) {
    this.sortOrder = order;
  }

  clearSort() {
    this.sortOrder = undefined;
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
    if (this.categories.length > 0 || this.categoriesMeta.isLoading) {
      return;
    }

    this.categoriesMeta.start();

    try {
      const data = await getCategories();
      runInAction(() => {
        this.categories.replace(data.data);
        this.categoriesMeta.success();
      });
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
        sortOrder: this.sortOrder,
      };

      const data = await getProducts(params);

      runInAction(() => {
        if (append) {
          this.products.push(...data.data);
        } else {
          this.products = data.data;
        }
        this.total = data.meta.pagination.total;
        this.productsMeta.success();
      });
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
    const query = queryString.parse(searchParams.toString());
    this.search = String(query.search ?? '');
    this.selectedCategoryIds.replace(
      query.categories
        ? String(query.categories).split(',').filter(Boolean).map(Number)
        : [],
    );
    this.sortOrder = (query.sortOrder as SortOrder) || undefined;
    this.isRestored = true;
  }

  //из текущего состояния стора создает URLSearchParams(то есть обновляет URL при применении фильтров)
  toUrlSearchParams(): string {
    return queryString.stringify({
      search: this.search || undefined,
      categories:
        this.selectedCategoryIds.length > 0
          ? this.selectedCategoryIds.join(',')
          : undefined,
      sortOrder: this.sortOrder,
    });
  }

  clear() {
    this.products = [];
    this.total = 0;
    this.search = '';
    this.selectedCategoryIds.replace([]);
    this.sortOrder = undefined;
    this.currentPage = 1;
    this.isRestored = false;
    this.categoriesMeta.reset();
    this.productsMeta.reset();
  }
}
