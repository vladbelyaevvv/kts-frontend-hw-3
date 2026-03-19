'use client';

import { useRouter } from 'next/navigation';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Product } from '@/api/productsApi';
import styles from './ProductsGrid.module.scss';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/providers/StoreProvider';

interface ProductsGridProps {
  products: Product[];
}

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
    <div className={styles['products-grid']}>
      {products.map((product) => (
        <Card
          className={styles['products-grid__card-pointer']}
          key={product.id}
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
      ))}
    </div>
  );
});

export default ProductsGrid;
