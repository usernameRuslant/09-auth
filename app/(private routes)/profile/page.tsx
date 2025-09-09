import Image from 'next/image';

import css from './ProfilePage.module.css';
import { getMe } from '@/lib/api/serverApi';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile Page',
  description: 'User profile page',
  openGraph: {
    title: 'Profile Page',
    description: 'User profile page',
    url: 'https://09-auth-gray-iota.vercel.app/profile',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Profile Page',
      },
    ],
  },
};
const Profile = async () => {
  const user = await getMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt={user.username}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p className={css.p}>Username: {user.username}</p>
          <p className={css.p}>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
