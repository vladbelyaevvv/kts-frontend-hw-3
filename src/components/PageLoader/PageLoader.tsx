import Loader from '@/components/Loader';
import Text from '@/components/Text';

const PageLoader = () => {
    return (
        <div>
            <Loader/>
            <Text view="p-20">Загрузка...</Text>
        </div>
    )
}

export default PageLoader