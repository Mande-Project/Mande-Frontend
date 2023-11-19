import { useAuthStore } from '@/src/store/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { logout } from '../api/auth';
const Header = () => {
  const router = useRouter();
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);
  const [dataUser, setDataUser] = useState({});

  useEffect(() => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    const user = useAuthStore.getState().user;
    setIsAuthenticatedUser(isAuthenticated);
    setDataUser(user);
  }, []);

  const handleLogout = async () => {
    logout();
    router.push('/login');
  };

  const guestLinks = () => (
    <div className='flex h-full grow justify-end space-x-10 '>
      <button
        onClick={() => router.push('/login')}
        type='button'
        className='w-full rounded bg-blue-800 px-2 py-1 text-xs font-bold uppercase text-white shadow-md sm:w-auto'
      >
        Login
      </button>
      <button
        onClick={() => router.push('/register')}
        type='button'
        className='w-full rounded bg-blue-800 px-2 py-1 text-xs font-bold uppercase text-white shadow-md sm:w-auto'
      >
        Sign Up
      </button>
    </div>
  );

  const authLinks = () => (
    <div className='flex h-full grow justify-end space-x-10 '>
      <button
        onClick={() => handleLogout()}
        type='button'
        className='w-full rounded bg-red-800 px-2 py-1 text-xs font-bold uppercase text-white shadow-md sm:w-auto'
      >
        Logout
      </button>
    </div>
  );

  return (
    <div className='mb-6 sm:flex sm:h-7 sm:items-end sm:justify-between '>
      <p className='mr-2 text-lg font-light lg:mb-0'>
        Bienvenido {`${dataUser.first_name}`}
      </p>
      {isAuthenticatedUser ? authLinks() : guestLinks()}
    </div>
  );
};

export default Header;
