import { notFound } from 'next/navigation';
import { getProductById, getRelatedProducts, Product } from '@/api/productsApi';
import ProductPageClient from './ProductPageClient';

type Props = {
  params: Promise<{ documentId: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { documentId } = await params;

  let product;
  let relatedProducts: Product[] = [];
  try {
    // Загружаем данные товара на сервере
    product = await getProductById(documentId);

    //загрузка похожих товаров
    if(product?.productCategory?.id){
      const [related] = await Promise.all([
        getRelatedProducts(product.id, product.productCategory.id)
      ]);
      relatedProducts = related;
    }
  } catch (error) {
    // показываем 404 если не найден товар
    notFound();
  }

  // начальные данные в клиентский компонент
  return (
    <ProductPageClient 
      documentId={documentId} 
      initialProduct={product}
      initialRelatedProducts={relatedProducts}
    />
  );
}
