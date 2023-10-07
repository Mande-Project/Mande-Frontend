import { logoutUser } from '@/src/api/access';
import { useAuthStore } from '@/src/store/auth';
import { useRouter } from 'next/router';
import React, { use } from 'react';
import { toast } from 'react-toastify';
import showToast from './Toast';

const Header = () => {
  const logout = useAuthStore((state) => state.logout);
  const profile = useAuthStore((state) => state.profile);
  console.log(profile);
  const router = useRouter();
  const { name } = { name: 'Test Name' };

  const handleLogout = async () => {
    const id = toast.loading('Loading...');
    try {
      // const {data} = await logoutUser();
      // console.log(res);
      showToast('promiseS', `Logout`, id);
      setTimeout(() => {
        logout();
        router.push('/login');
      }, 2000);
    } catch (error) {
      const res = error.response;
      console.log(res);
      // showToast('promiseE', `${data}`, id);
    }
  };

  return (
    <div className='sm:flex sm:justify-between mb-6'>
      <p className='mr-2 mb-5 lg:mb-0'>Hola</p>

      <button
        onClick={() => handleLogout()}
        type='button'
        className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md'
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
