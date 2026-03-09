'use client';

import { observer } from 'mobx-react-lite';
import styles from './page.module.scss';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Text from '@/components/Text';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useStores } from '@/providers/StoreProvider';
import Link from 'next/link';

const CartPage = observer(() => {
  const { cartStore, authStore } = useStores();
  const router = useRouter();
  const cart = cartStore;
  const items = cart.list; // массив товаров из стора

  //загрузка данных корзины с сервера при загрузке страницы
  // useEffect(() => {
  //   cart.fetch();
  // }, [cart]);

  //очистка айтема из корзины
  const handleRemove = (productId: number) => {
    cart.remove(productId);
  };

  //очистка всей корзины
  const handleClear = () => {
    cart.clear();
  };

  //Перенаправление войти если не авторизован
  if (!authStore.isAuthenticated) {
    return (
      <div className={styles['cart-page']}>
        <Navbar />
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
      <Navbar />
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
                <Button>Go to shopping</Button>
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
                        <img
                          src={item.product.images[0].url}
                          alt={item.product.title}
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
                      <Text view="p-20">x {item.quantity}</Text>
                    </div>

                    <div>
                      <Text view="p-20">
                        ${item.product.price * item.quantity}
                      </Text>
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

                  <Button className={styles['cart-summary__checkout']}>
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
