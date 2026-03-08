'use client';

import Text from '@/components/Text';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { authStore } from '@/stores/authStore';
import Navbar from '@/components/Navbar';
import LinkBack from '@/components/LinkBack';

const SignInPage = observer(() => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await authStore.login(email, password);
      router.push('/');
    } catch (error) {
      const message =
        (error as any)?.response?.data?.error?.message || 'An error has occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles['auth-page']}>
      <Navbar />
      <div className={styles['auth-page__container']}>
        <LinkBack />
        <div className={styles['auth-page__wrapper']}>
          <Text className={styles['auth-page__title']}>Log in</Text>

          <form onSubmit={handleSubmit} className={styles['auth-page__form']}>
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={setEmail}
              className={styles['auth-page__input']}
              required
            />

            <Input
              placeholder="Password"
              value={password}
              onChange={setPassword}
              className={styles['auth-page__input']}
              required
            />

            {error && <div className={styles['auth-page__error']}>{error}</div>}

            <Button
              type="submit"
              loading={loading}
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
