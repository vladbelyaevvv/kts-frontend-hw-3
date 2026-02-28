import { getProducts, Product } from "@/api/productsApi";
import { makeAutoObservable } from "mobx";

class ProductsStore {
    products: Product[] = [];
    loading = false;
    error = '';
    total = 0;
    search = '';

    constructor() {
        makeAutoObservable(this);
    }

    setSearch(value: string){
        this.search = value;
    }

    async fetchProducts() {
        try {
            this.loading = true;
            this.error = '';
            const params: {search?: string } = {};
            if(this.search) {
                params.search = this.search;
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
    }
}

export const productsStore = new ProductsStore();