import { getProductById, Product } from "@/api/productsApi";
import { makeAutoObservable, runInAction } from "mobx";

class ProductStore {
    product: Product | null = null;
    loading = false;
    error = '';

    constructor() {
        makeAutoObservable(this);
    }

    async fetchProduct(documentId: string) {
        if(!documentId) {
            return;
        }

        try {
            this.loading = true;
            this.error = '';
            const data = await getProductById(documentId);
            this.product = data;
        } catch (err) {
            this.error = 'Ошибка при загрузке товара';
        }finally{
            this.loading = false;
        }
    }

    clear() {
        this.product = null;
        this.loading = false;
        this.error = '';
    }
}

export const productStore = new ProductStore();