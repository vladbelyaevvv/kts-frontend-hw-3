import React from 'react';
import { Product } from '@/api/productsApi';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import styles from './ProductImage.module.scss';

interface ProductImageProps {
  product: Product;
}

const ProductImage = React.memo(({ product }: ProductImageProps) => {
  return (
    <div className={styles['product-image']}>
      <img
        src={product.images?.[0]?.url || ''}
        alt={product.title}
        className={styles['product-image__image']}
      />
      <div className={styles['product-image__controls']}>
        <button className={styles['product-image__control-button']}>
          <ArrowDownIcon
            className={`${styles['product-image__control-icon']} ${styles['product-image__control-icon--prev']}`}
            width={30}
            height={40}
          />
        </button>
        <button className={styles['product-image__control-button']}>
          <ArrowDownIcon
            className={`${styles['product-image__control-icon']} ${styles['product-image__control-icon--next']}`}
            width={30}
            height={40}
          />
        </button>
      </div>
    </div>
  );
});

export default ProductImage;
