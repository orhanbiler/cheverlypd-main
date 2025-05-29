import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Home - Cheverly Police Department',
  description: 'Official website of the Cheverly Police Department. Access field training portal, policy documentation, and community resources.',
  openGraph: {
    title: 'Home - Cheverly Police Department',
    description: 'Official website of the Cheverly Police Department. Access field training portal, policy documentation, and community resources.',
  },
};

export default function HomePage() {
  return <HomeClient />;
}