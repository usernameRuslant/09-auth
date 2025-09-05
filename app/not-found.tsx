import { Metadata } from 'next';
import css from './not-found.module.css';

export const metadata: Metadata = {
  title: '404 – Page not found',
  description: 'Sorry, the page you are looking for does not exist.',
  openGraph: {
    title: '404 – Page not found',
    description: 'Sorry, the page you are looking for does not exist.',
    url: 'https://08-zustand-teal-omega.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: '404 – Page not found',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div className={css.mid}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
