import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import styles from './ProductPage.module.scss';
import LinkBack from '@/components/LinkBack';
import Text from '@/components/Text';
import Button from '@/components/Button';
import RelatedItems from '@/components/RelatedItems';
import { useProduct } from '@/hooks/useProduct';
import { Product } from '@/api/productsApi';
import ProductImage from '@/components/ProductImage';

import image1 from './imagesRelated/1.png';
import image2 from './imagesRelated/2.png';
import image3 from './imagesRelated/3.png';
import PageLoader from '@/components/PageLoader/PageLoader';

const ProductPage = () => {
  const { documentId } = useParams<{ documentId: string }>();
  const { product, loading, error } = useProduct(documentId);

  const relatedProducts: Product[] = [
    {
      id: 1,
      documentId: '1',
      title: 'White Aesthetic Chair',
      productCategory: { title: 'Chair' },
      price: 63.47,
      images: [{ url: image1 }],
      description: 'Combination of wool and cotton',
    },
    {
      id: 2,
      documentId: '2',
      title: 'Wooden Cupboard 3 Row',
      productCategory: { title: 'Cupboard' },
      price: 79.88,
      images: [{ url: image2 }],
      description: 'Combination of wool and cotton',
    },
    {
      id: 3,
      documentId: '2',
      title: 'Minimalist Lounge Chair',
      productCategory: { title: 'Chair' },
      price: 14.74,
      images: [{ url: image3 }],
      description: 'Combination of wool and cotton',
    },
  ];

  if (loading) {
    return (
      <div className={styles['product-page__text']}>
        <PageLoader/>
      </div>
    );
  };

  if (error || !product) {
    return <div className={styles['product-page__text']}>Error</div>;
  }

  return (
    <div className={styles['product-page']}>
      <Navbar />
      <div className={styles['product-page__wrapper']}>
        <LinkBack />
        <div className={styles['product-page__content']}>
          <ProductImage product={product}></ProductImage>
          {/* Информация о товаре */}
          <div className={styles['product-page__info']}>
            <Text view="title" tag="h1">
              {product.title}
            </Text>
            <Text
              tag="p"
              color="secondary"
              className={styles['product-page__description']}
            >
              {product.description}
            </Text>
            <div className={styles['product-page__price-section']}>
              <Text view="title" className={styles['product-page__price']}>
                ${product.price}
              </Text>
              <div className={styles['product-page__actions']}>
                <Button>Buy Now</Button>
                <Button className={styles['product-page__add-to-cart']}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
        <RelatedItems products={relatedProducts}></RelatedItems>
      </div>
    </div>
  );
};

export default ProductPage;
