import { useProducts } from '@/hooks/useProducts';
import Text from '@/components/Text';
import styles from './ProductsPage.module.scss';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import SearchSection from '@/components/SearchSection';
import { Option } from '@/components/MultiDropdown';
import ProductsGrid from '@/components/ProductsGrid';
import Pagination from '@/components/Pagination';
import PageLoader from '@/components/PageLoader/PageLoader';

const PAGE_SIZE = 9;

const ProductsPage = () => {
  const { products, loading, error, total } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Option[]>([]);

  const handleSearch = () => {
    // console.log('Поиск', searchValue);
    // console.log('Категории', selectedCategories);
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / PAGE_SIZE);

  if (loading) {
    return (
      <div className={styles['products-page__text']}>
        <PageLoader/>
      </div>
    );
  }

  if (error) {
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
          onCategoriesChange={setSelectedCategories}
          totalProducts={total}
          onSearchSubmit={handleSearch}
        />

        <ProductsGrid products={currentProducts} />

        <Pagination />
      </div>
    </div>
  );
};

export default ProductsPage;
