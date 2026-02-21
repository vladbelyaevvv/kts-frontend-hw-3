import { getProductById, Product } from '@/api/productsApi';
import { useEffect, useState } from 'react';

export const useProduct = (documentId: string | undefined) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!documentId) {
      return;
    }
    setLoading(true);
    getProductById(documentId)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка при загрузке товара');
        setLoading(false);
      });
  }, [documentId]);

  return { product, loading, error };
};
