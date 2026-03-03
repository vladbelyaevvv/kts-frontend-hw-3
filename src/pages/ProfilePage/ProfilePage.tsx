import Navbar from '@/components/Navbar';
import Text from '@/components/Text';
import { authStore } from '@/stores/authStore';
import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import styles from './ProfilePage.module.scss';
import Button from '@/components/Button';

const ProfilePage = observer(() => {
  const { user } = authStore;

  const handleLogout = () => {
    authStore.setSignOut();
  };

  if (!authStore.isAuthenticated) {
    return <Navigate to="/auth/signin" replace />;
  }

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
