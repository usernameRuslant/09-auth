'use client';
import { useAuthStore } from '@/lib/store/authStore';
import css from './AuthNavigation.module.css';
import Link from 'next/link';
import TagsMenu from '../TagsMenu/TagsMenu';
import { logout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';

const AuthNavigation = () => {
  const router = useRouter();
  const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();
  const onClickLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push('/sign-in');
  };
  return (
    <>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link className={css.navigationLink} href="/profile">
              profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.p}>{user?.email}</p>
          </li>
          <li className={css.navigationItem}>
            <button
              type="button"
              onClick={onClickLogout}
              className={css.logoutButton}
            >
              logout
            </button>
          </li>
          <li className={css.navigationItem}>
            <TagsMenu />
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link className={css.navigationLink} href="/sign-in">
              sign in
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link className={css.navigationLink} href="/sign-up">
              sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
};

export default AuthNavigation;
