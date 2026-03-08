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
            title={product.title}
            subtitle={product.description}
            contentSlot={
              <Text tag="p" weight="bold">
                ${product.price}
              </Text>
            }
            actionSlot={
              <Button onClick={(e) => handleAddToCart(e, product)}>
                {cartStore.isInCart(product.id)
                  ? 'Already in cart'
                  : 'Add to Cart'}
              </Button>
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
