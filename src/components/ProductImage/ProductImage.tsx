'use client';

import React, { useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { Product } from '@/api/productsApi';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import styles from './ProductImage.module.scss';

interface ProductImageProps {
  product: Product;
}

const ProductImage = React.memo(({ product }: ProductImageProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = product.images || [];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles['product-image']}>
      {images[currentIndex]?.url && (
        <Image
          src={images[currentIndex].url}
          alt={product.title}
          className={styles['product-image__image']}
          width={500}
          height={500}
        />
      )}
      <div className={styles['product-image__controls']}>
        <button
          className={styles['product-image__control-button']}
          onClick={handlePrev}
          type="button"
          aria-label="Previous image"
        >
          <ArrowDownIcon
            className={classNames(
              styles['product-image__control-icon'],
              styles['product-image__control-icon--prev'],
            )}
            width={30}
            height={40}
          />
        </button>
        <button
          className={styles['product-image__control-button']}
          onClick={handleNext}
          type="button"
          aria-label="Next image"
        >
          <ArrowDownIcon
            className={classNames(
              styles['product-image__control-icon'],
              styles['product-image__control-icon--next'],
            )}
            width={30}
            height={40}
          />
        </button>
      </div>

      <div className={styles['product-image__indicators']}>
        {images.map((_, index) => (
          <button
            key={index}
            className={classNames(styles['product-image__indicator'], {
              [styles['product-image__indicator--active']]:
                index === currentIndex,
            })}
            onClick={() => setCurrentIndex(index)}
            type="button"
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
});

ProductImage.displayName = 'ProductImage';

export default ProductImage;
