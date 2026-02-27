import { getProducts, Product } from "@/api/productsApi";
import { makeAutoObservable } from "mobx";

class ProductsStore {
    products: Product[] = [];
    loading = false;
    error = '';
    total = 0;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchProducts() {
        try {
            this.loading = true;
            this.error = '';
            const data = await getProducts();
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
    }
}

export const productsStore = new ProductsStore();