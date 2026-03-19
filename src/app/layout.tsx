import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.scss';
import { StoreProvider } from '@providers/StoreProvider';
import Navbar from '@/components/Navbar';

const roboto = localFont({
  src: [
    { path: '../styles/Roboto/Roboto-Regular.woff2', weight: '400' },
    { path: '../styles/Roboto/Roboto-Medium.woff2', weight: '500' },
    { path: '../styles/Roboto/Roboto-Bold.woff2', weight: '700' },
  ],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Lalasia',
  description: 'Интернет-магазин Lalasia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={roboto.className}>
        <StoreProvider>
          <Navbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
