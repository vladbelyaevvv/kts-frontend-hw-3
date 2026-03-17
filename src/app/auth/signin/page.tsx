'use client';

import Text from '@/components/Text';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useStores } from '@/providers/StoreProvider'; 
import LinkBack from '@/components/LinkBack';

const SignInPage = observer(() => {
  const { authStore } = useStores();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await authStore.login(authStore.formUsername, authStore.formPassword);
    router.push('/');
  };

  return (
    <div className={styles['auth-page']}>
      <div className={styles['auth-page__container']}>
        <LinkBack />
        <div className={styles['auth-page__wrapper']}>
          <Text className={styles['auth-page__title']}>Log in</Text>

          <form onSubmit={handleSubmit} className={styles['auth-page__form']}>
            <Input
              placeholder="Email"
              type="email"
              value={authStore.formUsername}
              onChange={authStore.setFormUsername}
              className={styles['auth-page__input']}
              required
            />

            <Input
              placeholder="Password"
              value={authStore.formPassword}
              onChange={authStore.setFormPassword}
              className={styles['auth-page__input']}
              required
            />

            {authStore.authMeta.isError && (
              <div className={styles['auth-page__error']}>
                {authStore.authMeta.errorMessage}
              </div>
            )}

            <Button
              type="submit"
              loading={authStore.authMeta.isLoading}
              className={styles['auth-page__button']}
            >
              Log in
            </Button>
          </form>

          <div className={styles['auth-page__switch']}>
            <Text view="p-18" color="secondary">
              No account?{' '}
              <Link href="/auth/signup" className={styles['auth-page__link']}>
                Sign in
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SignInPage;
