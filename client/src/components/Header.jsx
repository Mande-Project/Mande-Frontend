import { useAuthStore } from '@/src/store/auth';
import { useRouter } from 'next/navigation';
import React from 'react';
import { logout } from '../api/auth';
const Header = () => {
  const [user] = useAuthStore((state) => [state.user])
  const {first_name} = user
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
    <div className='mb-6 sm:flex sm:h-7 sm:items-end sm:justify-between '>
      <p className='mr-2 text-lg font-light lg:mb-0'>
        Bienvenido {`${first_name}`}
      </p>
      {isAuthenticated ? authLinks() : guestLinks()}
    </div>
  );
};

export default Header;
