'use client';

import Text from '@/components/Text';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import SearchSection from '@/components/SearchSection';
import { Option } from '@/components/MultiDropdown';
import ProductsGrid from '@/components/ProductsGrid';
import PageLoader from '@/components/PageLoader/PageLoader';
import { observer } from 'mobx-react-lite';
import Button from '@/components/Button';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProductsStore } from '@/stores/productsStore';

const ProductsPage = observer(() => {
  const [ productsStore ] = useState(() => new ProductsStore())
  const searchParams = useSearchParams();
  const router = useRouter();

  //загрузка категорий про монтировании
  useEffect(() => {
    productsStore.fetchCategories();
  }, []);

  //восстановление  состояния изи url
  useEffect(() => {
    if (productsStore.categories.length === 0) {
      return;
    } // надо дождаться загрузки категорий
    if (productsStore.isRestored) {
      return;
    } // если уже восстановили - чтобы один раз толкьо сработало

    productsStore.restoreFromUrl(searchParams);
    productsStore.fetchProducts();
  }, [productsStore.categories]);

  const handleSearch = () => {
    productsStore.fetchProducts();
    const params = productsStore.toUrlSearchParams();
    router.push(`/?${params.toString()}`);
  };

  const handleClearFilters = () => {
    productsStore.clear();
    productsStore.fetchProducts();
    router.push('/');
  };

  const handleCategoriesChange = (options: Option[]) => {
    productsStore.setSelectedCategoryIds(options.map((opt) => Number(opt.key)));
  };

  const handleSearchChange = (value: string) => {
    productsStore.setSearch(value);
  };

  const handleShowMore = () => {
    productsStore.loadMore();
  };

  if (productsStore.productsMeta.isLoading) {
    return (
      <div className={styles['products-page__text']}>
        <PageLoader />
      </div>
    );
  }

  if (productsStore.productsMeta.isError) {
    return <div className={styles['products-page__text']}>Error</div>;
  }

  return (
    <div className="main_page">
      <Navbar/>
      <div className={styles['products-page__content']}>
        <div className={styles['products-page__text']}>
          <Text view="title" className={styles['products-page__title']}>
            Products
          </Text>
          <Text view="p-20" color="secondary" className="">
            We display products based on the latest products we have, if you
            want to see our old products please enter the name of the item
          </Text>
        </div>

        <SearchSection
          searchValue={productsStore.search}
          onSearchChange={handleSearchChange}
          selectedCategories={productsStore.selectedCategories}
          onCategoriesChange={handleCategoriesChange}
          totalProducts={productsStore.total}
          onSearchSubmit={handleSearch}
          onClearFilters={handleClearFilters}
          productsStore={productsStore}
        />

        <ProductsGrid products={productsStore.products} />

        <div className={styles['products-page__show-more']}>
          {productsStore.productsMeta.isLoading && <PageLoader />}
          {!productsStore.productsMeta.isLoading && productsStore.hasMore && (
            <Button onClick={handleShowMore}>Show more</Button>
          )}
          {!productsStore.hasMore && productsStore.products.length > 0 && (
            <Text view="p-20" color="secondary">
              No more products
            </Text>
          )}
        </div>
      </div>
    </div>
  );
});

export default ProductsPage;
