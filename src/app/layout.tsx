import type { Metadata } from 'next';
import './globals.scss';
import { StoreProvider } from '@providers/StoreProvider';

export const metadata: Metadata = {
  title: 'Lalasia',
  description: 'Интернет-магазин Lalasia',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}