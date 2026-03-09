import { AuthStore } from "./authStore";
import { CartStore } from "./cartStore";

export class RootStore {
    authStore: AuthStore;
    cartStore: CartStore;

    constructor(){
        this.authStore = new AuthStore();
        this.cartStore = new CartStore();
    }
}

export const rootStore = new RootStore();