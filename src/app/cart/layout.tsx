import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping cart — Lalasia',
  description: 'Your shopping cart at Lalasia.',
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
