import axios from 'axios';
import qs from 'qs';

const api = axios.create({
  baseURL: 'https://front-school-strapi.ktsdev.ru/api/products',
});

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
  images?: { url: string }[];
  productCategory?: { title: string };
};

export interface GetProductsParams {
  search?: string;
  categoryIds?: number[];
  page?: number;
  pageSize?: number;
}

// получить весь список товаров
export const getProducts = async (params?: GetProductsParams ) => {
  const filters: Record<string, unknown> = {};

  if (params?.search){
    filters.title = {
        $containsi: params.search,
    };
  }

  if(params?.categoryIds && params.categoryIds.length > 0) {
    filters.productCategory = {
      id: {
        $in: params.categoryIds,
      },
    };
  }

  const queryConfig: Record<string, unknown> = {
    populate: ['images', 'productCategory'],
  }

  if (Object.keys(filters).length > 0) {
    queryConfig.filters = filters;
  }

  if(params?.page && params?.pageSize) {
    queryConfig.pagination = {
      page: params.page,
      pageSize: params.pageSize,
    }
  }

  const query = qs.stringify(queryConfig)

  const response = await api.get<ProductsResponse>(`?${query}`);
  return response.data;
};

export const getProductById = async (documentId: string) => {
  const query = qs.stringify({
    populate: ['images', 'productCategory'],
  });

  const response = await api.get<{ data: Product }>(`/${documentId}?${query}`);
  return response.data.data;
};

export type Category = {
  id: number;
  title: string;
}

export type CategoriesResponse = {
  data: Category[];
}

// получить список категорий
export const getCategories = async () => {
  const apiCategories = axios.create({
    baseURL: 'https://front-school-strapi.ktsdev.ru/api/product-categories',
  });
  const response = await apiCategories.get<CategoriesResponse>('');
  return response.data;
}