import { Product } from '@/api/productsApi';
import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import styles from './ProductImage.module.scss';

interface ProductImageProps {
  product: Product;
}

const ProductImage = ({ product }: ProductImageProps) => {
  return (
    <div className={styles.productImage}>
      <img
        src={product.images?.[0]?.url || ''}
        alt={product.title}
        className={styles.image}
      />
      <div className={styles.controls}>
        <button className={styles.controlButton}>
          <ArrowDownIcon
            className={`${styles.controlIcon} ${styles.prev}`}
            width={30}
            height={40}
          />
        </button>
        <button className={styles.controlButton}>
          <ArrowDownIcon
            className={`${styles.controlIcon} ${styles.next}`}
            width={30}
            height={40}
          />
        </button>
      </div>
    </div>
  );
};

export default ProductImage;