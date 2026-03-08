'use client';

import Navbar from '@/components/Navbar';
import Text from '@/components/Text';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';
import styles from './page.module.scss';
import Button from '@/components/Button';
import { useEffect } from 'react';
import { useStores } from '@/providers/StoreProvider';

const ProfilePage = observer(() => {
  const { authStore } = useStores();
  const router = useRouter();
  const { user } = authStore;

  const handleLogout = () => {
    authStore.setSignOut();
  };

  useEffect(() => {
    if (!authStore.isAuthenticated) {
      router.replace('/auth/signin');
    }
  });

  return (
    <div className={styles['profile-page']}>
      <Navbar />
      <div className={styles['profile-page__container']}>
        <div className={styles['profile-page__wrapper']}>
          <Text view="title" className={styles['profile-page__title']}>
            Profile
          </Text>

          <div className={styles['profile-page__info']}>
            <div className={styles['profile-page__field']}>
              <Text view="p-20">Username:</Text>
              <Text view="p-20">{user?.username}</Text>
            </div>

            <div className={styles['profile-page__field']}>
              <Text view="p-20">Email:</Text>
              <Text view="p-20">{user?.email}</Text>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            className={styles['profile-page__logout']}
          >
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
});

export default ProfilePage;
