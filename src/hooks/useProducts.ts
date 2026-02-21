import { getProducts, Product } from '@/api/productsApi';
import { useEffect, useState } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data.data);
        setTotal(data.meta.pagination.total);
      } catch (err) {
        setError('Ошибка при загрузке товаров');
        // console.log('Ошибка: ', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error, total };
};
