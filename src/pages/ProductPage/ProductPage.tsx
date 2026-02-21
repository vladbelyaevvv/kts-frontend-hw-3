import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import styles from './ProductPage.module.scss';
import LinkBack from '@/components/LinkBack';
import Text from '@/components/Text';
import Button from '@/components/Button';
import RelatedItems from '@/components/RelatedItems';
import { useProduct } from '@/hooks/useProduct';
import { Product } from '@/api/productsApi';
import Loader from '@/components/Loader';
import ProductImage from '@/components/ProductImage';

const ProductPage = () => {
    const { documentId } = useParams<{ documentId: string }>();
    const { product, loading, error} = useProduct(documentId);

    const relatedProducts: Product[] = [
        {
            id: 1,
            documentId: '1',
            title: 'White Aesthetic Chair',
            productCategory: { title: 'Chair' },
            price: 63.47,
            images:[ { url: ''}],
            description: 'Combination of wool and cotton',
        },
        {
            id: 2,
            documentId: '2',
            title: 'Wooden Cupboard 3 Row',
            productCategory: { title: 'Cupboard' },
            price: 79.88,
            images:[ { url: ''}],
            description: 'Combination of wool and cotton',
        },
        {
            id: 3,
            documentId: '2',
            title: 'Minimalist Lounge Chair',
            productCategory: { title: 'Chair' },
            price: 14.74,
            images: [ { url: ''}],
            description: 'Combination of wool and cotton',
        },
    ]

     if( loading) {
        return (
            <div className={styles.text}>
                <Loader></Loader>
                <Text view="p-20">Загрузка...</Text>
            </div>
        );
    }
    
    if (error || !product) {
        return (
            <div className={styles.text}>Error</div>
        )
    }

    return (
        <div className={styles.page}>
            <Navbar />
            <div className={styles.wrapper}>
                <LinkBack />
                <div className={styles.content}>    
                    <ProductImage product={product}></ProductImage>
                    {/* Информация о товаре */}
                    <div className={styles.productInfo}>
                        <Text view="title" tag="h1">{product.title}</Text>
                        <Text tag="p" color="secondary" className={styles.description}>
                            {product.description}
                        </Text>
                        <div className={styles.priceSection}>
                        <Text view="title" className={styles.price}>${product.price}</Text>
                        <div className={styles.actions}>
                            <Button>Buy Now</Button>
                            <Button className={styles.addToCart}>Add to Cart</Button>
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