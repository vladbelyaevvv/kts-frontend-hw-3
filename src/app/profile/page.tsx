'use client';

import Text from '@/components/Text';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import Button from '@/components/Button';
import { useEffect } from 'react';
import { useStores } from '@/providers/StoreProvider';
import PageLoader from '@/components/PageLoader/PageLoader';
import Link from 'next/link';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
} as const;

const ProfilePage = observer(() => {
  const { authStore } = useStores();
  const router = useRouter();
  const { user } = authStore;

  useEffect(() => {
    if (!authStore.isAuthenticated) {
      router.replace('/auth/signin');
    }
  }, [authStore.isAuthenticated, router]);

  const handleLogout = () => authStore.setSignOut();

  useEffect(() => {
    if (!authStore.isAuthenticated) {
      router.replace('/auth/signin');
    }
  });

  if (!user) {
    return (
      <div className={styles['profile-page']}>
        <div className={styles['profile-page__loader']}>
          <PageLoader />
        </div>
      </div>
    );
  }

  const avatarLetter = user.username.charAt(0).toUpperCase();

  return (
    <motion.div
      className={styles['profile-page']}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles['profile-page__container']}>
        {/* Хедер с аватаром */}
        <motion.div
          className={styles['profile-page__header']}
          variants={itemVariants}
        >
          <div className={styles['profile-page__avatar']}>{avatarLetter}</div>
          <div className={styles['profile-page__header-info']}>
            <Text view="title" tag="h1">
              {user.username}
            </Text>
            <Text view="p-18" color="secondary">
              {user.email}
            </Text>
          </div>
        </motion.div>

        <motion.div
          className={styles['profile-page__body']}
          variants={itemVariants}
        >
          {/* Информация */}
          <motion.div
            className={styles['profile-page__section']}
            variants={itemVariants}
          >
            <Text
              view="p-18"
              weight="bold"
              tag="h2"
              className={styles['profile-page__section-title']}
            >
              Account details
            </Text>
            <div className={styles['profile-page__info']}>
              <div className={styles['profile-page__field']}>
                <Text view="p-16" color="secondary">
                  Username
                </Text>
                <Text view="p-16" weight="medium">
                  {user.username}
                </Text>
              </div>
              <div className={styles['profile-page__field']}>
                <Text view="p-16" color="secondary">
                  Email
                </Text>
                <Text view="p-16" weight="medium">
                  {user.email}
                </Text>
              </div>
            </div>
          </motion.div>

          {/* Быстрые ссылки */}
          <motion.div
            className={styles['profile-page__section']}
            variants={itemVariants}
          >
            <Text
              view="p-18"
              weight="bold"
              tag="h2"
              className={styles['profile-page__section-title']}
            >
              Quick actions
            </Text>
            <div className={styles['profile-page__actions']}>
              <Link href="/" className={styles['profile-page__action-card']}>
                <div className={styles['profile-page__action-icon']}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 6h18M3 12h18M3 18h12"
                      stroke="#518581"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <Text view="p-16" weight="bold">
                    Browse products
                  </Text>
                  <Text view="p-14" color="secondary">
                    Explore our full catalogue
                  </Text>
                </div>
              </Link>

              <Link
                href="/cart"
                className={styles['profile-page__action-card']}
              >
                <div className={styles['profile-page__action-icon']}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 7.67V6.7C7.5 4.45 9.31 2.24 11.56 2.03C14.24 1.77 16.5 3.88 16.5 6.51V7.89"
                      stroke="#518581"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 22H15C19.02 22 19.74 20.39 19.95 18.43L20.7 12.43C20.97 9.99 20.27 8 16 8H8C3.73 8 3.03 9.99 3.3 12.43L4.05 18.43C4.26 20.39 4.98 22 9 22Z"
                      stroke="#518581"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <Text view="p-16" weight="bold">
                    Shopping cart
                  </Text>
                </div>
              </Link>

              <Link
                href="/categories"
                className={styles['profile-page__action-card']}
              >
                <div className={styles['profile-page__action-icon']}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 10h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Zm12 0h2a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2ZM5 20h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Zm12 0h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2Z"
                      stroke="#518581"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <Text view="p-16" weight="bold">
                    Categories
                  </Text>
                  <Text view="p-14" color="secondary">
                    Shop by category
                  </Text>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* Выход */}
          <motion.div variants={itemVariants}>
            <Button
              onClick={handleLogout}
              className={styles['profile-page__logout']}
            >
              Log out
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
});

export default ProfilePage;
