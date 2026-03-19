'use client';

import Input from '@/components/Input';
import Button from '@/components/Button';
import MultiDropdown, { Option } from '@/components/MultiDropdown';
import Text from '@/components/Text';
import styles from './SearchSection.module.scss';
import { observer } from 'mobx-react-lite';
import { ProductsStore } from '@/stores/productsStore';
import classNames from 'classnames';
import { SortOrder } from '@/api/productsApi';

interface SearchSectionProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedCategories: Option[];
  onCategoriesChange: (options: Option[]) => void;
  totalProducts: number;
  onSearchSubmit: () => void;
  onClearFilters?: () => void;
  productsStore: ProductsStore;
}

type SortOption = {
  label: string;
  order: SortOrder;
};

const SORT_OPTIONS: SortOption[] = [
  { label: 'Price ↑', order: 'asc' },
  { label: 'Price ↓', order: 'desc' },
];

const SearchSection = observer(
  ({
    searchValue,
    onSearchChange,
    selectedCategories,
    onCategoriesChange,
    totalProducts,
    onSearchSubmit,
    onClearFilters,
    productsStore,
  }: SearchSectionProps) => {
    const categoryOptions: Option[] = productsStore.categories.map(
      (category) => ({
        key: String(category.id),
        value: category.title,
      })
    );

    const hasFilters = searchValue || selectedCategories.length > 0 || productsStore.sortOrder;
    
    const handleSortClick = (opt: SortOption) => {
      const isActive = productsStore.sortOrder === opt.order;
      if (isActive) {
        productsStore.clearSort();
      } else {
        productsStore.setSort(opt.order);
      }
      onSearchSubmit();
    };

    return (
      <div className={styles['search-section']}>
        <div className={styles['search-section__bar']}>
          <Input
            value={searchValue}
            onChange={onSearchChange}
            placeholder="Search product"
            className={styles['search-section__input']}
          />
          <Button
            onClick={onSearchSubmit}
            className={styles['search-section__button']}
          >
            Find now
          </Button>
        </div>
        <div className={styles['search-section__filters']}>
          <MultiDropdown
            className={styles['search-section__filter']}
            options={categoryOptions}
            value={selectedCategories}
            onChange={onCategoriesChange}
            getTitle={(options) =>
              options.length === 0
                ? 'Filter'
                : options.map((opt) => opt.value).join(', ')
            }
          />

          <div className={styles['search-section__sort']}>
              {SORT_OPTIONS.map((opt) => {
                const isActive = productsStore.sortOrder === opt.order;
                return (
                  <button
                    key={opt.order}
                    type="button"
                    className={classNames(styles['search-section__sort-btn'], {
                      [styles['search-section__sort-btn--active']]: isActive,
                    })}
                    onClick={() => handleSortClick(opt)}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
        </div>

        {hasFilters && onClearFilters && (
          <Button
            onClick={onClearFilters}
            className={styles['search-section__clear-btn']}
          >
            Clear filters
          </Button>
        )}
        <div
          className={classNames(styles['search-section__total'], {
            [styles['search-section__total--visible']]: !productsStore.productsMeta.isLoading && totalProducts > 0,
          })}
        >
          <Text tag="h4" weight="bold">
            Total products
          </Text>
          <Text view="p-20" color="accent">
            {totalProducts}
          </Text>
        </div>
      </div>
    );
  }
);

export default SearchSection;
