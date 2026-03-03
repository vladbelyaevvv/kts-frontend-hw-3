import { useNavigate } from 'react-router-dom';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { Product } from '@/api/productsApi';
import styles from './ProductsGrid.module.scss';
import React from 'react';
import { authStore } from '@/stores/authStore';
import { cartStore } from '@/stores/cartStore';
import { observer } from 'mobx-react-lite';

interface ProductsGridProps {
  products: Product[];
}

const ProductsGrid = observer(({ products }: ProductsGridProps) => {
  const navigate = useNavigate();

  const handleCardClick = (documentId: string) => {
    navigate(`/product/${documentId}`);
  };

  const handleAddToCart = async (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();

    if (!authStore.isAuthenticated) {
      navigate('/auth/signin');
      return;
    }

    await cartStore.add(product);
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
            <Button onClick={(e) => handleAddToCart(e, product)}>
              {cartStore.isInCart(product.id)
                ? 'Already in cart'
                : 'Add to Cart'}
            </Button>
          }
          onClick={() => handleCardClick(product.documentId)}
        />
      ))}
    </div>
  );
});

export default ProductsGrid;
