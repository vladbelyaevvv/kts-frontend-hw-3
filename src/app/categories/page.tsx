'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { ProductsStore } from '@/stores/productsStore';
import Text from '@/components/Text';
import Button from '@/components/Button';
import Navbar from '@/components/Navbar';
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
      <Navbar />
      <div className={styles['categories-page__container']}>
        <Text view="title" tag="h1">
          Categories
        </Text>

        <div className={styles['categories-page__list']}>
          {productsStore.categories.map((category) => (
            <Button
              key={category.id}
              className={styles['categories-page__button']}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.title}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
});

export default CategoriesPage;
