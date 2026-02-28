import { Category, getCategories, getProducts, GetProductsParams, Product } from "@/api/productsApi";
import { makeAutoObservable } from "mobx";

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

    constructor() {
        makeAutoObservable(this);
    }

    setSearch(value: string){
        this.search = value;
    }
    
    setCategories(ids: number[]){
        this.selectedCategoryIds = ids;
    }

    async fetchCategories(){
        try {
            this.categoriesLoading = true;
            this.categoriesError = '';
            const data = await getCategories();
            this.categories = data.data;
        } catch(err) {
            this.categoriesError = 'Ошибка при загрузке категорий';
        } finally {
            this.categoriesLoading = false;
        }
    }

    async fetchProducts() {
        try {
            this.loading = true;
            this.error = '';
            const params: GetProductsParams = {};
            if(this.search) {
                params.search = this.search;
            }
            if (this.selectedCategoryIds.length > 0) {
                params.categoryIds = this.selectedCategoryIds;
            }

            const data = await getProducts(params);
            this.products = data.data;
            this.total = data.meta.pagination.total;
        } catch(err) {
            this.error = 'Ошибка при загрузке товаров';
        } finally {
            this.loading = false;
        }
    }

    clear(){
        this.products = [];
        this.loading = false;
        this.error = '';
        this.total = 0;
        this.search = '';
        this.selectedCategoryIds = [];
    }
}

export const productsStore = new ProductsStore();