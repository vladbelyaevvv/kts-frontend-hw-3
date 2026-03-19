'use client';

import styles from './page.module.scss';
import LinkBack from '@/components/LinkBack';
import Text from '@/components/Text';
import Button from '@/components/Button';
import RelatedItems from '@/components/RelatedItems';
import ProductImage from '@/components/ProductImage';
import PageLoader from '@/components/PageLoader/PageLoader';
import { observer } from 'mobx-react-lite';
import { useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useStores } from '@/providers/StoreProvider';
import { ProductStore } from '@/stores/productStore';
import { Product } from '@/api/productsApi';
import { motion } from 'framer-motion';

type Props = {
  documentId: string;
  initialProduct: Product;
};

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
} as const;

const contentVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
} as const;

const infoVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: 0.2,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
} as const;

const ProductPage = observer(({ documentId, initialProduct }: Props) => {
  const router = useRouter();
  const { authStore, cartStore } = useStores();

  const productStoreRef = useRef<ProductStore | null>(null);
  if (!productStoreRef.current) {
    productStoreRef.current = new ProductStore();
    productStoreRef.current.init(documentId, initialProduct);
  }
  const productStore = productStoreRef.current;

  const handleAddToCart = useCallback(async () => {
    if (!authStore.isAuthenticated) {
      router.push('/auth/signin');
      return;
    }

    if (productStore.product) {
      await cartStore.add(productStore.product);
    }
  }, [authStore.isAuthenticated, cartStore, productStore, router]);

  const handleIncrement = () => {
    if (productStore.product) {
      cartStore.increment(productStore.product.id);
    }
  };

  const handleDecrement = () => {
    if (productStore.product) {
      cartStore.decrement(productStore.product.id);
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
    <motion.div
      className={styles['product-page']}
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles['product-page__wrapper']}>
        <LinkBack />
        <motion.div
          className={styles['product-page__content']}
          variants={contentVariants}
        >
          <ProductImage product={productStore.product}></ProductImage>
          {/* Информация о товаре */}
          <motion.div
            className={styles['product-page__info']}
            variants={infoVariants}
          >
            <Text view="title" tag="h1">
              {productStore.product.title}
            </Text>
            {productStore.product.rating !== undefined && (
              <div className={styles['product-page__rating']}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 14 14"
                  fill="#f5c518"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 1L8.854 4.756L13 5.364L10 8.292L10.708 12.42L7 10.47L3.292 12.42L4 8.292L1 5.364L5.146 4.756L7 1Z" />
                </svg>
                <Text view="p-20" weight="bold">
                  {productStore.product.rating}
                </Text>
                <Text view="p-18" color="secondary">
                  / 5
                </Text>
              </div>
            )}
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
                {cartStore.isInCart(productStore.product.id) ? (
                  <div className={styles['product-page__counter']}>
                    <button
                      className={`${styles['product-page__counter-btn']} ${styles['product-page__counter-btn--minus']}`}
                      onClick={handleDecrement}
                    >
                      −
                    </button>
                    <span className={styles['product-page__counter-qty']}>
                      {cartStore.getQuantity(productStore.product.id)}
                    </span>
                    <button
                      className={styles['product-page__counter-btn']}
                      onClick={handleIncrement}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <Button
                    className={styles['product-page__add-to-cart']}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
        {productStore.relatedMeta.isLoading && <PageLoader />}
        {productStore.relatedMeta.isError && (
          <Text color="secondary">Похожие товары недоступны</Text>
        )}
        {!productStore.relatedMeta.isLoading &&
          !productStore.relatedMeta.isError &&
          productStore.relatedProducts.length > 0 && (
            <RelatedItems products={productStore.relatedProducts} />
          )}
      </div>
    </motion.div>
  );
});

export default ProductPage;
