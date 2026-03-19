import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Categories — Lalasia',
  description: 'Browse all furniture and home decor categories at Lalasia.',
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
