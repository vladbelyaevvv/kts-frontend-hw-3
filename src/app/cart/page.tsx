'use client';

import { observer } from 'mobx-react-lite';
import styles from './page.module.scss';
import Text from '@/components/Text';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useStores } from '@/providers/StoreProvider';
import Link from 'next/link';
import Image from 'next/image';

const CartPage = observer(() => {
  const { cartStore, authStore } = useStores();
  const router = useRouter();
  const cart = cartStore;
  const items = cart.list; // массив товаров из стора

  // Увеличить количество
  const handleIncrement = (productId: number) => {
    cart.increment(productId);
  };

  // Уменьшить количество
  const handleDecrement = (productId: number) => {
    cart.decrement(productId);
  };

  // Удалить товар полностью
  const handleRemove = (productId: number) => {
    cart.remove(productId);
  };

  //очистка всей корзины
  const handleClear = () => {
    cart.clear();
  };

  // Оформление заказа
  const handleMakeOrder = () => {
    alert('Order placed successfully!');
  };

  //Перенаправление войти если не авторизован
  if (!authStore.isAuthenticated) {
    return (
      <div className={styles['cart-page']}>
        <div className={styles['cart-page__centered']}>
          <Text view="p-20" color="secondary">
            Please log in to work with the shopping cart
          </Text>
          <Button onClick={() => router.push('/auth/signin')}>Log in</Button>
        </div>
      </div>
    );
  }

  //основной рендер корзины
  return (
    <div className={styles['cart-page']}>
      <div className={styles['cart-page__container']}>
        <div className={styles['cart-page__wrapper']}>
          <Text view="title" className={styles['cart-page__title']}>
            Shopping cart
          </Text>

          {items.length === 0 ? (
            <div className={styles['cart-page__empty']}>
              <Text view="p-20" color="secondary">
                The cart is empty
              </Text>
              <Link href="/">
                <Button className={styles['cart-page__empty-button']}>Go to shopping</Button>
              </Link>
            </div>
          ) : (
            <>
              {/* список товаров в корзине */}
              <div className={styles['cart-page__items']}>
                {items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${index}`}
                    className={styles['cart-item']}
                  >
                    <div className={styles['cart-item__image']}>
                      {item.product.images?.[0]?.url && (
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.title}
                          width={100}
                          height={100}
                        />
                      )}
                    </div>

                    <div className={styles['cart-item__info']}>
                      <Text view="p-20">{item.product.title}</Text>
                      <Text view="p-18" color="secondary">
                        ${item.product.price} per piece
                      </Text>
                    </div>

                    <div>
                      <Text view="p-20">
                        ${item.product.price * item.quantity}
                      </Text>
                    </div>

                    {/* Счётчик количества */}
                    <div className={styles['cart-item__quantity']}>
                      <Button
                        onClick={() => handleDecrement(item.product.id)}
                        className={styles['cart-item__qty-btn-decrement']}
                      >
                        -
                      </Button>
                      <Text view="p-20" className={styles['cart-item__qty-value']}>
                        {item.quantity}
                      </Text>
                      <Button
                        onClick={() => handleIncrement(item.product.id)}
                        className={styles['cart-item__qty-btn']}
                      >
                        +
                      </Button>
                    </div>

                    <Button
                      onClick={() => handleRemove(item.product.id)}
                      className={styles['cart-item__remove']}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>

              {/* итоговая инфа по корзине */}
              <div className={styles['cart-page__summary']}>
                <div className={styles['cart-summary']}>
                  {/* кол-во товаров */}
                  <div className={styles['cart-summary__row']}>
                    <Text view="p-20" color="secondary">
                      Total products:{' '}
                    </Text>
                    <Text view="p-20">{cart.count}</Text>
                  </div>

                  {/* сумма заказа */}
                  <div className={styles['cart-summary__row']}>
                    <Text view="p-20" color="secondary">
                      Total amount:{' '}
                    </Text>
                    <Text
                      view="title"
                      color="accent"
                      className={styles['cart-summary__total']}
                    >
                      ${cart.total}
                    </Text>
                  </div>

                  <Button
                    onClick={handleMakeOrder}
                    className={styles['cart-summary__checkout']}
                  >
                    Make an order
                  </Button>

                  <Button
                    onClick={handleClear}
                    className={styles['cart-summary__clear']}
                  >
                    Empty the cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default CartPage;
