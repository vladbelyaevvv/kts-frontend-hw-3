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
import { useStores } from '@/providers/StoreProvider';
import { useSearchParams, useRouter } from 'next/navigation';

const ProductsPage = observer(() => {
  const { productsStore } = useStores();
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);
  const searchParams = useSearchParams();
  const [isRestored, setIsRestored] = useState(false);
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
    if (isRestored) {
      return;
    } // если уже восстановили - чтобы один раз толкьо сработало

    const searchFromUrl = searchParams.get('search') || '';
    const categoriesFromUrl =
      searchParams.get('categories')?.split(',').filter(Boolean) || [];

    setSearchValue(searchFromUrl);

    if (categoriesFromUrl.length > 0) {
      const options: Option[] = categoriesFromUrl
        .map((id) => {
          const category = productsStore.categories.find(
            (categ) => String(categ.id) === id
          );
          return category ? { key: id, value: category.title } : null;
        })
        .filter((opt): opt is Option => opt !== null);
      setSelectedCategories(options);
      productsStore.setCategories(options.map((opt) => Number(opt.key)));
    }

    //загрузка товаров с учетом параметров
    if (searchFromUrl) {
      productsStore.setSearch(searchFromUrl);
    }
    if (categoriesFromUrl.length > 0) {
      productsStore.setCategories(categoriesFromUrl.map(Number));
    }
    productsStore.fetchProducts();

    setIsRestored(true);
  }, [productsStore.categories]);

  const handleSearch = () => {
    const categoryIds = selectedCategories.map((opt) => Number(opt.key));
    productsStore.setCategories(categoryIds);
    productsStore.setSearch(searchValue);
    productsStore.fetchProducts();

    const params = new URLSearchParams();
    if (searchValue) {
      params.set('search', searchValue);
    }
    if (categoryIds.length > 0) {
      params.set('categories', categoryIds.join(','));
    }
    router.push(`/?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setSearchValue('');
    setSelectedCategories([]);
    productsStore.setSearch('');
    productsStore.setCategories([]);
    productsStore.fetchProducts();
    router.push('/');
  };

  const handleCategoriesChange = (options: Option[]) => {
    setSelectedCategories(options);
  };

  const handleShowMore = () => {
    productsStore.loadMore();
  };

  if (productsStore.loading) {
    return (
      <div className={styles['products-page__text']}>
        <PageLoader />
      </div>
    );
  }

  if (productsStore.error) {
    return <div className={styles['products-page__text']}>Error</div>;
  }

  return (
    <div className="main_page">
      <Navbar></Navbar>
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
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          selectedCategories={selectedCategories}
          onCategoriesChange={handleCategoriesChange}
          totalProducts={productsStore.total}
          onSearchSubmit={handleSearch}
          onClearFilters={handleClearFilters}
        />

        <ProductsGrid products={productsStore.products} />

        <div className={styles['products-page__show-more']}>
          {productsStore.loading && <PageLoader />}
          {!productsStore.loading && productsStore.hasMore && (
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
