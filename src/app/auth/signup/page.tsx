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

const SignUpPage = observer(() => {
  const { authStore } = useStores();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!authStore.formUsername) {
      authStore.authMeta.error('Enter the username');
      return;
    }

    await authStore.register(authStore.formUsername, authStore.formEmail, authStore.formPassword);
    router.push('/');
  };

  return (
    <div className={styles['auth-page']}>
      <div className={styles['auth-page__container']}>
        <LinkBack />
        <div className={styles['auth-page__wrapper']}>
          <Text className={styles['auth-page__title']}>Registration</Text>

          <form onSubmit={handleSubmit} className={styles['auth-page__form']}>
            <Input
              placeholder="Username"
              value={authStore.formUsername}
              onChange={authStore.setFormUsername}
              className={styles['auth-page__input']}
              required
            />

            <Input
              placeholder="Email"
              type="email"
              value={authStore.formEmail}
              onChange={authStore.setFormEmail}
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
              Sign in
            </Button>
          </form>

          <div className={styles['auth-page__switch']}>
            <Text view="p-18" color="secondary">
              Already have an account?{' '}
              <Link href="/auth/signin" className={styles['auth-page__link']}>
                Log in
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SignUpPage;
