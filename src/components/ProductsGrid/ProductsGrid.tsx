import { useNavigate } from 'react-router-dom';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Product } from '@/api/productsApi';
import styles from './ProductsGrid.module.scss';
import React from 'react';

interface ProductsGridProps {
  products: Product[];
}

const ProductsGrid = React.memo(({ products }: ProductsGridProps) => {
  const navigate = useNavigate();

  const handleCardClick = (documentId: string) => {
    navigate(`/product/${documentId}`);
  };

  const handleAddToCart = (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    // console.log('Добавить в корзину', productId);
  };

  return (
    <div className={styles['products-grid']}>
      {products.map((product) => (
        <Card
          className={styles['products-grid__card-pointer']}
          key={product.id}
          captionSlot={product.productCategory?.title}
          image={product.images?.[0]?.url || ''}
          title={product.title}
          subtitle={product.description}
          contentSlot={`$${product.price}`}
          actionSlot={
            <Button onClick={(e) => handleAddToCart(e, product.id)}>
              Add to Cart
            </Button>
          }
          onClick={() => handleCardClick(product.documentId)}
        />
      ))}
    </div>
  );
});

export default ProductsGrid;
