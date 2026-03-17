'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { ProductsStore } from '@/stores/productsStore';
import Text from '@/components/Text';
import Button from '@/components/Button';
import styles from './page.module.scss';

const CategoriesPage = observer(() => {
  const [productsStore] = useState(() => new ProductsStore());
  const router = useRouter();

  useEffect(() => {
    productsStore.fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: number) => {
    router.push(`/?categories=${categoryId}`);
  };

  return (
    <div className={styles['categories-page']}>
      <div className={styles['categories-page__container']}>
        <Text view="title" tag="h1">
          Categories
        </Text>
        <Text view="p-20" color="secondary">
          Find exactly what you are looking for!
        </Text>

        <div className={styles['categories-page__grid']}>
          {productsStore.categories.map((category) => (
            <div
              key={category.id}
              className={styles['categories-page__card']}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className={styles['categories-page__card-image']}>
                <span className={styles['categories-page__card-letter']}>
                  {category.title.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className={styles['categories-page__card-body']}>
                <Text view="p-20" weight="bold">
                  {category.title}
                </Text>
                <Text view="p-14" color="secondary">
                  View products →
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default CategoriesPage;
