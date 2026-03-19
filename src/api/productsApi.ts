import api from './axios';
import qs from 'qs';

export type Category = {
  id: number;
  title: string;
  image?: {
    url: string;
    formats?: {
      small?: { url: string };
    };
  };
};

export type CategoriesResponse = {
  data: Category[];
};

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
  description?: string;
  price: number;
  rating?: number;
  images?: { url: string }[];
  productCategory?: { title: string; id?: number };
};

export type SortOrder = 'asc' | 'desc';

export interface GetProductsParams {
  search?: string;
  categoryIds?: number[];
  page?: number;
  pageSize?: number;
  sortOrder?: SortOrder;
}

// получить весь список товаров
export const getProducts = async (params?: GetProductsParams) => {
  const filters: Record<string, unknown> = {};

  if (params?.search) {
    filters.title = {
      $containsi: params.search,
    };
  }

  if (params?.categoryIds && params.categoryIds.length > 0) {
    filters.productCategory = {
      id: {
        $in: params.categoryIds,
      },
    };
  }

  const queryConfig: Record<string, unknown> = {
    populate: ['images', 'productCategory'],
  };

  if (params?.sortOrder) {
    queryConfig.sort = [`price:${params.sortOrder}`];
  }

  if (Object.keys(filters).length > 0) {
    queryConfig.filters = filters;
  }

  if (params?.page && params?.pageSize) {
    queryConfig.pagination = {
      page: params.page,
      pageSize: params.pageSize,
    };
  }

  const query = qs.stringify(queryConfig);

  const response = await api.get<ProductsResponse>(`/products?${query}`);
  return response.data;
};

export const getProductById = async (documentId: string) => {
  const query = qs.stringify({
    populate: ['images', 'productCategory'],
  });

  const response = await api.get<{ data: Product }>(
    `/products/${documentId}?${query}`,
  );
  return response.data.data;
};

// получить список категорий
export const getCategories = async () => {
  const query = qs.stringify({ populate: 'image' });
  const response = await api.get<CategoriesResponse>(
    `/product-categories?${query}`,
  );
  return response.data;
};

export const getRelatedProducts = async (
  categoryId: number,
  currentProductId: number,
) => {
  const query = qs.stringify({
    filters: {
      productCategory: {
        id: {
          $eq: categoryId,
        },
      },
      id: {
        $ne: currentProductId,
      },
    },
    populate: ['images', 'productCategory'],
    pagination: {
      limit: 3,
    },
  });

  const response = await api.get<ProductsResponse>(`/products?${query}`);
  return response.data.data;
};
