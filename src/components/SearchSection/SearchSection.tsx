import Input from '@/components/Input';
import Button from '@/components/Button';
import MultiDropdown, { Option } from '@/components/MultiDropdown';
import Text from '@/components/Text';
import styles from './SearchSection.module.scss';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { productsStore } from '@/stores/productsStore';

interface SearchSectionProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedCategories: Option[];
  onCategoriesChange: (options: Option[]) => void;
  totalProducts: number;
  onSearchSubmit: () => void;
}

const SearchSection = observer(({
  searchValue,
  onSearchChange,
  selectedCategories,
  onCategoriesChange,
  totalProducts,
  onSearchSubmit,
}: SearchSectionProps) => {
  useEffect(() => {
    productsStore.fetchCategories();
  }, []);

  const categoryOptions: Option[] = productsStore.categories.map((category) => ({
    key: String(category.id),
    value: category.title,
  }));

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
      <div className={styles['search-section__total']}>
        <Text tag="h4" weight="bold">
          Total products
        </Text>
        <Text view="p-20" color="accent">
          {totalProducts}
        </Text>
      </div>
    </div>
  );
});

export default SearchSection;
