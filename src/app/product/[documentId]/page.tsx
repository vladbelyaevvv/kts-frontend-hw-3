import { notFound } from 'next/navigation';
import { getProductById } from '@/api/productsApi';
import ProductPageClient from './ProductPageClient';

type Props = {
  params: Promise<{ documentId: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { documentId } = await params;

  let product;
  try {
    // Загружаем данные товара на сервере
    product = await getProductById(documentId);
  } catch (error) {
    // показываем 404 если не найден товар
    notFound();
  }

  // начальные данные в клиентский компонент
  return <ProductPageClient documentId={documentId} initialProduct={product} />;
}
