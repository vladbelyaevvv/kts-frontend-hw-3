import Loader from '@/components/Loader';
import Text from '@/components/Text';
import React from 'react';

const PageLoader = React.memo(() => {
  return (
    <div>
      <Loader />
      <Text view="p-20">Loading...</Text>
    </div>
  );
});

export default PageLoader;
