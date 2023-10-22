import { useAuthStore } from '@/src/store/auth';
import { useRouter } from 'next/navigation';
import React from 'react';
import { logout } from '../api/auth';
const Header = () => {
  const router = useRouter();
  const isAuthenticated = useAuthStore.getState().isAuthenticated;

  const handleLogout = async () => {
    logout();
    router.push('/login');
  };

  const guestLinks = () => (
    <div className='flex justify-end grow space-x-10 h-full '>
      <button
        onClick={() => router.push('/login')}
        type='button'
        className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md'
      >
        Login
      </button>
      <button
        onClick={() => router.push('/register')}
        type='button'
        className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md'
      >
        Sign Up
      </button>
    </div>
  );

  const authLinks = () => (
    <div className='flex justify-end grow space-x-10 h-full '>
      <button
        onClick={() => handleLogout()}
        type='button'
        className='bg-red-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md'
      >
        Logout
      </button>
    </div>
  );

  return (
    <div className='sm:flex sm:justify-between sm:items-end mb-6 sm:h-7 '>
      <p className='mr-2 lg:mb-0'>Hola</p>
      {isAuthenticated ? authLinks() : guestLinks()}
    </div>
  );
};

export default Header;
