import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About us — Lalasia',
  description:
    'Learn about Lalasia — our mission, values and the story behind our furniture and home decor store.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
