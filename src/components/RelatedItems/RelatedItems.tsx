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

interface RelatedItemsProps {
  products: Product[];
}

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
    <div className={styles['related-items']}>
      <Text tag="h1" className={styles['related-items__title']}>
        Related Items
      </Text>
      <div className={styles['related-items__grid']}>
        {products.map((product) => (
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
                  <button className={`${styles['related-items__counter-btn']} ${styles['related-items__counter-btn--minus']}`} onClick={(e) => handleDecrement(e, product.id)}>−</button>
                  <span className={styles['related-items__counter-qty']}>{cartStore.getQuantity(product.id)}</span>
                  <button className={styles['related-items__counter-btn']} onClick={(e) => handleIncrement(e, product.id)}>+</button>
                </div>
              ) : (
                <Button onClick={(e) => handleAddToCart(e, product)}>Add to Cart</Button>
              )
            }
            captionSlot={product.productCategory?.title}
            onClick={() => handleCardClick(product.documentId)}
          />
        ))}
      </div>
    </div>
  );
});

export default RelatedItems;
