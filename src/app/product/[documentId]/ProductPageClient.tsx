'use client';

import Navbar from '@/components/Navbar';
import styles from './page.module.scss';
import LinkBack from '@/components/LinkBack';
import Text from '@/components/Text';
import Button from '@/components/Button';
import RelatedItems from '@/components/RelatedItems';
import ProductImage from '@/components/ProductImage';
import PageLoader from '@/components/PageLoader/PageLoader';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useStores } from '@/providers/StoreProvider';
import { ProductStore } from '@/stores/productStore';
import { Product } from '@/api/productsApi';

type Props = {
  documentId: string;
  initialProduct: Product;
  initialRelatedProducts: Product[];
};

const ProductPage = observer(({ documentId, initialProduct, initialRelatedProducts }: Props) => {
  const router = useRouter();
  const { authStore, cartStore } = useStores();

  const [productStore] = useState(() => new ProductStore());
  const initializedRef = useRef(false);

  useEffect(() => {
    if (documentId  && !initializedRef.current) {
      initializedRef.current = true;
      productStore.init(documentId, initialProduct, initialRelatedProducts);
    }
  }, [documentId, initialProduct]);

  const handleAddToCart = async () => {
    if (!authStore.isAuthenticated) {
      router.push('/auth/signin');
      return;
    }

    if (productStore.product) {
      await cartStore.add(productStore.product);
    }
  };

  if (productStore.productMeta.isLoading) {
    return (
      <div className={styles['product-page__text']}>
        <PageLoader />
      </div>
    );
  }

  if (productStore.productMeta.isError || !productStore.product) {
    return <div className={styles['product-page__text']}>Error</div>;
  }

  return (
    <div className={styles['product-page']}>
      <Navbar />
      <div className={styles['product-page__wrapper']}>
        <LinkBack />
        <div className={styles['product-page__content']}>
          <ProductImage product={productStore.product}></ProductImage>
          {/* Информация о товаре */}
          <div className={styles['product-page__info']}>
            <Text view="title" tag="h1">
              {productStore.product.title}
            </Text>
            <Text
              tag="p"
              color="secondary"
              className={styles['product-page__description']}
            >
              {productStore.product.description}
            </Text>
            <div className={styles['product-page__price-section']}>
              <Text view="title" className={styles['product-page__price']}>
                ${productStore.product.price}
              </Text>
              <div className={styles['product-page__actions']}>
                <Button>Buy Now</Button>
                <Button
                  className={styles['product-page__add-to-cart']}
                  onClick={handleAddToCart}
                >
                  {cartStore.isInCart(productStore.product.id)
                    ? 'Already in cart'
                    : 'Add to Cart'}
                </Button>
              </div>
            </div>
          </div>
        </div>
        {productStore.relatedMeta.isLoading && <PageLoader />}
        {productStore.relatedMeta.isError && (
          <Text color="secondary">Похожие товары недоступны</Text>
        )}
        {!productStore.relatedMeta.isLoading && !productStore.relatedMeta.isError && productStore.relatedProducts.length > 0 && (
          <RelatedItems products={productStore.relatedProducts} />
        )}
      </div>
    </div>
  );
});

export default ProductPage;
