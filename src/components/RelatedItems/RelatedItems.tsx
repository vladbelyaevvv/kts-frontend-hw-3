'use client';

import Text from '@/components/Text';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { Product } from '@/api/productsApi';
import styles from './RelatedItems.module.scss';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import { useStores } from '@/providers/StoreProvider';
import { motion } from 'framer-motion';

interface RelatedItemsProps {
  products: Product[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
} as const;

const RelatedItems = observer(({ products }: RelatedItemsProps) => {
  const router = useRouter();
  const { authStore, cartStore } = useStores();

  const handleAddToCart = async (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();

    if (!authStore.isAuthenticated) {
      router.push('/auth/signin');
      return;
    }

    await cartStore.add(product);
  };

  const handleIncrement = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    cartStore.increment(productId);
  };

  const handleDecrement = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    cartStore.decrement(productId);
  };

  const handleCardClick = (documentId: string) => {
    router.push(`/product/${documentId}`);
  };

  return (
    <motion.div
      className={styles['related-items']}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Text tag="h1" className={styles['related-items__title']}>
        Related Items
      </Text>
      <motion.div
        className={styles['related-items__grid']}
        variants={containerVariants}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            className={styles['related-items__card-wrapper']}
          >
            <Card
              key={product.id}
              className={styles['related-items__card-pointer']}
              image={product.images?.[0]?.url || ''}
              rating={product.rating}
              title={product.title}
              subtitle={product.description}
              contentSlot={
                <Text tag="p" weight="bold">
                  ${product.price}
                </Text>
              }
              actionSlot={
                cartStore.isInCart(product.id) ? (
                  <div className={styles['related-items__counter']}>
                    <button
                      className={`${styles['related-items__counter-btn']} ${styles['related-items__counter-btn--minus']}`}
                      onClick={(e) => handleDecrement(e, product.id)}
                    >
                      −
                    </button>
                    <span className={styles['related-items__counter-qty']}>
                      {cartStore.getQuantity(product.id)}
                    </span>
                    <button
                      className={styles['related-items__counter-btn']}
                      onClick={(e) => handleIncrement(e, product.id)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <Button onClick={(e) => handleAddToCart(e, product)}>
                    Add to Cart
                  </Button>
                )
              }
              captionSlot={product.productCategory?.title}
              onClick={() => handleCardClick(product.documentId)}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
});

export default RelatedItems;
