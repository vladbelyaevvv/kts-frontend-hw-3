'use client';

import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Input from '../Input';
import styles from './MultiDropdown.module.scss';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import Text from '../Text';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = React.memo(({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false); // открыт ли список опций
  const [filter, setFilter] = useState(options); // отфильтрованные опции
  const [currentInput, setCurrentInput] = useState(''); // текущий текст, введенный в поле
  const dropdownRef = useRef<HTMLDivElement>(null); // ссылка на корневой компонент

  // обработчик изменения текста в инпуте
  const handleInputChange = (inputValue: string) => {
    if (value.length) {
      return;
    }

    setCurrentInput(inputValue);

    //фильтрация исходных опций
    const newFilteredOptions = options.filter((option) =>
      option.value.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    setFilter(newFilteredOptions);
  };

  //обработчик клика по опции
  const handleOptionClick = (option: Option) => {
    // поиск индекса выбранной опции
    const optionIndex = value.findIndex((item) => item.key === option.key);

    if (optionIndex !== -1) {
      // если уже выбрана - удаляем ее
      onChange(
        value.slice(0, optionIndex).concat(value.slice(optionIndex + 1))
      );
      return;
    }
    // если не выбрана - добавляем к уже выбранным
    onChange([...value, option]);
  };

  // обработчик клика вне компонента(закрытие)
  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // отслеживание кликов вне компонента
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // для синхронизации отфильтрованных с исходными
  useEffect(() => {
    setFilter(options);
  }, [options, setFilter]);

  return (
    <div
      className={classNames(styles['multi-dropdown__container'], className)}
      ref={dropdownRef}
    >
      <Input
        type="text"
        value={value.length ? getTitle(value) : currentInput}
        onClick={() => !disabled && setIsOpen(true)}
        onChange={handleInputChange}
        placeholder={getTitle(value)}
        disabled={disabled}
        afterSlot={<ArrowDownIcon color="secondary" />}
      />

      {isOpen && !disabled && (
        <div className={styles['multi-dropdown__options']}>
          {filter.map((option) => (
            <div
              key={option.key}
              className={styles['multi-dropdown__option-wrapper']}
              onClick={() => handleOptionClick(option)}
              data-testid={option.key}
            >
              <Text className={styles['multi-dropdown__option-text']}>
                {option.value}
              </Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default MultiDropdown;
