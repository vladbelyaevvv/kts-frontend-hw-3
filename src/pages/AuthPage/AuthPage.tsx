import Text from '@/components/Text';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AuthPage.module.scss';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { authStore } from '@/stores/authStore';
import Navbar from '@/components/Navbar';
import LinkBack from '@/components/LinkBack';

interface AuthPageProps {
  mode: 'signIn' | 'signUp';
}

const AuthPage = observer(({ mode }: AuthPageProps) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signIn') {
        //Вход
        await authStore.login(email, password);
        navigate('/');
      } else {
        // Регистрация
        if (!username) {
          setError('Enter the username');
          setLoading(false);
          return;
        }

        await authStore.register(username, email, password);
        navigate('/');
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.error?.message || 'An error has occurred';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const isSignIn = mode === 'signIn';

  return (
    <div className={styles['auth-page']}>
      <Navbar />
      <div className={styles['auth-page__container']}>
        <LinkBack />
        <div className={styles['auth-page__wrapper']}>
          <Text className={styles['auth-page__title']}>
            {isSignIn ? 'Log in' : 'Registration'}
          </Text>

          <form onSubmit={handleSubmit} className={styles['auth-page__form']}>
            {!isSignIn && (
              <Input
                placeholder="Username"
                value={username}
                onChange={setUsername}
                className={styles['auth-page__input']}
                required
              />
            )}

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
              {isSignIn ? 'Log in' : 'Sign in'}
            </Button>
          </form>

          <div className={styles['auth-page__switch']}>
            {isSignIn ? (
              <Text view="p-18" color="secondary">
                No account?{' '}
                <Link to="/auth/signup" className={styles['auth-page__link']}>
                  Sign in
                </Link>
              </Text>
            ) : (
              <Text view="p-18" color="secondary">
                Already have an account?{' '}
                <Link to="/auth/signin" className={styles['auth-page__link']}>
                  Log in
                </Link>
              </Text>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default AuthPage;
