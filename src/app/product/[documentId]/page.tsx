import { notFound } from 'next/navigation';
import { getProductById } from '@/api/productsApi';
import ProductPageClient from './ProductPageClient';
import { Metadata } from 'next';

export const revalidate = 60;

type Props = {
  params: Promise<{ documentId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { documentId } = await params;
  try {
    const product = await getProductById(documentId);
    return {
      title: `${product.title} — Lalasia`,
      description: product.description ?? `Buy ${product.title} at Lalasia`,
    };
  } catch {
    return { title: 'Product — Lalasia' };
  }
}

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
