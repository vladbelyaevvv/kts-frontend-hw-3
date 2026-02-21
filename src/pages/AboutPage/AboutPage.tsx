import Text from '@/components/Text'
import styles from './AboutPage.module.scss'
import Navbar from '@/components/Navbar';

const AboutPage = () => {
    return (
        <main className={styles.about}>
            <Navbar></Navbar>
            <div className={styles.content}>
                <Text view="title">About us</Text>
            </div>
        </main>
    )
}

export default AboutPage;