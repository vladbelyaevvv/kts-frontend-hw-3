import Input from '@/components/Input';
import Button from '@/components/Button';
import MultiDropdown, { Option } from '@/components/MultiDropdown';
import Text from '@/components/Text';
import styles from './SearchSection.module.scss';

interface SearchSectionProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedCategories: Option[];
  onCategoriesChange: (options: Option[]) => void;
  totalProducts: number;
  onSearchSubmit: () => void;
}

const categoryOptions: Option[] = [
  { key: '1', value: 'Electronics' },
  { key: '2', value: 'Furniture' },
  { key: '3', value: 'Clothing' },
];

const SearchSection = ({
  searchValue,
  onSearchChange,
  selectedCategories,
  onCategoriesChange,
  totalProducts,
  onSearchSubmit,
}: SearchSectionProps) => {
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
};

export default SearchSection;
