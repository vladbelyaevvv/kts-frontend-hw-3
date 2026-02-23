import Text from '@/components/Text';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { Product } from '@/api/productsApi';
import styles from './RelatedItems.module.scss';

interface RelatedItemsProps {
  products: Product[];
}

const RelatedItems = ({ products }: RelatedItemsProps) => {
  return (
    <div className={styles['related-items']}>
      <Text tag="h1" className={styles['related-items__title']}>
        Related Items
      </Text>
      <div className={styles['related-items__grid']}>
        {products.map((product) => (
          <Card
            key={product.id}
            image={product.images?.[0]?.url || ''}
            title={product.title}
            subtitle={product.description}
            contentSlot={
              <Text tag="p" weight="bold">
                ${product.price}
              </Text>
            }
            actionSlot={<Button>Add to Cart</Button>}
            captionSlot={product.productCategory?.title}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedItems;
