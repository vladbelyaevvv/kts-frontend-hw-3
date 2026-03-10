'use client';

import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { Product } from '@/api/productsApi';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import styles from './ProductImage.module.scss';

interface ProductImageProps {
  product: Product;
}

const ProductImage = React.memo(({ product }: ProductImageProps) => {
  return (
    <div className={styles['product-image']}>
      {product.images?.[0]?.url && (
        <Image
          src={product.images[0].url}
          alt={product.title}
          className={styles['product-image__image']}
          width={500}
          height={500}
        />
      )}
      <div className={styles['product-image__controls']}>
        <button className={styles['product-image__control-button']}>
          <ArrowDownIcon
            className={classNames(
              styles['product-image__control-icon'],
              styles['product-image__control-icon--prev']
            )}
            width={30}
            height={40}
          />
        </button>
        <button className={styles['product-image__control-button']}>
          <ArrowDownIcon
            className={classNames(
              styles['product-image__control-icon'],
              styles['product-image__control-icon--next']
            )}
            width={30}
            height={40}
          />
        </button>
      </div>
    </div>
  );
});

ProductImage.displayName = 'ProductImage';

export default ProductImage;
