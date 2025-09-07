'use client';
import { useRouter } from 'next/navigation';
import css from './page.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getMe, updateUser } from '@/lib/api/clientApi';

const Edit = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<{ email: string; avatar: string } | null>(
    null
  );

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getMe();
      setUsername(user.username);
      setUser({ email: user.email, avatar: user.avatar });
    };
    fetchUser();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser({ username });
    router.push('/profile');
  };
  const onCancel = () => {
    router.push('/profile');
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || '/default-avatar.png'}
          alt={user?.email || 'User Avatar'}
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={onSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Edit;
