import Text from '@/components/Text';
import styles from './page.module.scss';
import Navbar from '@/components/Navbar';

const AboutPage = () => {
  return (
    <main className={styles['about-page']}>
      <Navbar></Navbar>
      <div className={styles['about-page__content']}>
        <Text view="title">About us</Text>
      </div>
    </main>
  );
};

export default AboutPage;
