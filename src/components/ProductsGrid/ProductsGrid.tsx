'use client';

import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Product } from '@/api/productsApi';
import styles from './ProductsGrid.module.scss';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/providers/StoreProvider';
import { motion } from 'framer-motion';

interface ProductsGridProps {
  products: Product[];
}

//для framer motion
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
} as const;

const ProductsGrid = observer(({ products }: ProductsGridProps) => {
  const { authStore, cartStore } = useStores();
  const router = useRouter();

  const handleCardClick = (documentId: string) => {
    router.push(`/product/${documentId}`);
  };

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

  return (
    <motion.div
      className={styles['products-grid']}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={itemVariants}
          className={styles['products-grid__card-wrapper']}
        >
          <Card
            className={styles['products-grid__card-pointer']}
            captionSlot={product.productCategory?.title}
            image={product.images?.[0]?.url || ''}
            rating={product.rating}
            title={product.title}
            subtitle={product.description}
            contentSlot={`$${product.price}`}
            actionSlot={
              cartStore.isInCart(product.id) ? (
                <div className={styles['products-grid__counter']}>
                  <button
                    className={`${styles['products-grid__counter-btn']} ${styles['products-grid__counter-btn--minus']}`}
                    onClick={(e) => handleDecrement(e, product.id)}
                  >
                    −
                  </button>
                  <span className={styles['products-grid__counter-qty']}>
                    {cartStore.getQuantity(product.id)}
                  </span>
                  <button
                    className={styles['products-grid__counter-btn']}
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
            onClick={() => handleCardClick(product.documentId)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
});

export default ProductsGrid;
