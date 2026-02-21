import { useNavigate } from "react-router-dom";
import styles from './LinkBack.module.scss';
import Text from '@/components/Text'

const LinkBack = () => {
    const navigate = useNavigate();
    return (
        <div className={styles.linkBack} onClick={() => navigate(-1)}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <Text view="p-20" color="primary" className={styles.linkBackText}>Назад</Text>
        </div>
    )
}

export default LinkBack;