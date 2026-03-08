'use client';

import { useEffect } from 'react';
import Text from '@components/Text';
import Button from '@components/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Text view="title" tag="h1">Something went wrong</Text>
      <div style={{ margin: '24px 0' }}>
        <Text view="p-20" color="secondary">
          {error.message || 'An unexpected error occurred'}
        </Text>
      </div>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
