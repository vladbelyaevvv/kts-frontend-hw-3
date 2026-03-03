import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import styles from './ProductPage.module.scss';
import LinkBack from '@/components/LinkBack';
import Text from '@/components/Text';
import Button from '@/components/Button';
import RelatedItems from '@/components/RelatedItems';
import ProductImage from '@/components/ProductImage';
import PageLoader from '@/components/PageLoader/PageLoader';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { productStore } from '@/stores/productStore';
import { authStore } from '@/stores/authStore';
import { cartStore } from '@/stores/cartStore';

const ProductPage = observer(() => {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (documentId) {
      productStore.fetchProduct(documentId);
    }
  }, [documentId]);

  const handleAddToCart = async () => {
    if (!authStore.isAuthenticated) {
      navigate('/auth/signin');
      return;
    }

    if (productStore.product) {
      await cartStore.add(productStore.product);
    }
  };

  if (productStore.loading) {
    return (
      <div className={styles['product-page__text']}>
        <PageLoader />
      </div>
    );
  }

  if (productStore.error || !productStore.product) {
    return <div className={styles['product-page__text']}>Error</div>;
  }

  return (
    <div className={styles['product-page']}>
      <Navbar />
      <div className={styles['product-page__wrapper']}>
        <LinkBack />
        <div className={styles['product-page__content']}>
          <ProductImage product={productStore.product}></ProductImage>
          {/* Информация о товаре */}
          <div className={styles['product-page__info']}>
            <Text view="title" tag="h1">
              {productStore.product.title}
            </Text>
            <Text
              tag="p"
              color="secondary"
              className={styles['product-page__description']}
            >
              {productStore.product.description}
            </Text>
            <div className={styles['product-page__price-section']}>
              <Text view="title" className={styles['product-page__price']}>
                ${productStore.product.price}
              </Text>
              <div className={styles['product-page__actions']}>
                <Button>Buy Now</Button>
                <Button
                  className={styles['product-page__add-to-cart']}
                  onClick={handleAddToCart}
                >
                  {cartStore.isInCart(productStore.product.id)
                    ? 'Already in cart'
                    : 'Add to Cart'}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <RelatedItems products={productStore.relatedProducts}></RelatedItems>
      </div>
    </div>
  );
});

export default ProductPage;
