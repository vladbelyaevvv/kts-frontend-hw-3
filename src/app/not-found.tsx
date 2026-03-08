import Link from 'next/link';
import Text from '@components/Text';
import Button from '@components/Button';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Text view="title" tag="h1">404</Text>
      <div style={{ margin: '24px 0' }}>
        <Text view="p-20" color="secondary">
          Page not found
        </Text>
      </div>
      <Link href="/">
        <Button>Go back home</Button>
      </Link>
    </div>
  );
}
