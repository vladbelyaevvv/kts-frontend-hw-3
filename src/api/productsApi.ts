import axios from "axios";
import qs from 'qs';

const api = axios.create({
    baseURL: 'https://front-school-strapi.ktsdev.ru/api/products'
})

// в чем приходят все товары
export type ProductsResponse = {
    data: Product[];
    meta: {
        pagination: {
            total: number;
        };
    };
};

// как приходит конкретный товар
export type Product = {
    id: number;
    documentId: string;
    title: string;
    description: string;
    price: number;
    images?: {url: string}[];
    productCategory?: { title: string };
};

// получить весь список товаров
export const getProducts = async () => {
    const query = qs.stringify({
        populate: ['images', 'productCategory'],
        //Сейчас пока что по 25 приходит, только первая страница
        // pagination: {
        //     pageSize: 100,
        // }
    });

    const response = await api.get<ProductsResponse>(`?${query}`);
    return response.data;
};

export const getProductById = async (documentId: string) => {
    const query = qs.stringify({
        populate: ['images', 'productCategory']
    });

    const response = await api.get<{data: Product } >(`/${documentId}?${query}`);
    return response.data.data
}