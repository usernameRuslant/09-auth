'use client';
import { login } from '@/lib/api/clientApi';
import css from './SignInPage.module.css';
import { Credentials } from '@/types/user';
import { useAuthStore } from '@/lib/store/authStore';
import { ApiError } from 'next/dist/server/api-utils';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser);
  const onSubmit = async (formData: FormData) => {
    try {
      const values = Object.fromEntries(formData) as unknown as Credentials;
      const user = await login(values);
      if (user) {
        setUser(user);
        router.push('/profile');
      }
    } catch (error) {
      setError((error as ApiError).message ?? 'something went wrong');
    }
  };
  return (
    <main className={css.mainContent}>
      <form className={css.form} action={onSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>
        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
};

export default SignIn;
