'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { observer } from 'mobx-react-lite';
import { ProductsStore } from '@/stores/productsStore';
import Text from '@/components/Text';
import Image from 'next/image';
import styles from './page.module.scss';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
} as const;

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
    <motion.div
      className={styles['categories-page']}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles['categories-page__container']}>
        <Text view="title" tag="h1">
          Categories
        </Text>
        <Text view="p-20" color="secondary">
          Find exactly what you are looking for!
        </Text>

        <motion.div
          className={styles['categories-page__grid']}
          variants={containerVariants}
        >
          {productsStore.categories.map((category) => (
            <motion.div
              key={category.id}
              className={styles['categories-page__card']}
              variants={itemVariants}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className={styles['categories-page__card-image']}>
                {category.image?.url ? (
                  <Image
                    src={
                      category.image.formats?.small?.url ?? category.image.url
                    }
                    alt={category.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <span className={styles['categories-page__card-letter']}>
                    {category.title.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className={styles['categories-page__card-body']}>
                <Text view="p-20" weight="bold">
                  {category.title}
                </Text>
                <Text view="p-14" color="secondary">
                  View products →
                </Text>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
});

export default CategoriesPage;
