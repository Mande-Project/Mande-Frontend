import { logoutUser } from '@/api/access';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';

const Header = () => {
  const router = useRouter();
  const { name } = { name: 'Test Name' };

  const logout = async () => {
    const id = toast.loading('Loading...');
    try {
      const {data} = await logoutUser();
      console.log(res);
      showToast('promiseS', `${data}`, id);
      setTimeout(() => {
        localStorage.removeItem('token');
        router.push('/login');
      }, 2000);
    } catch (error) {
      const res = error.response;
      console.log(res)
      // showToast('promiseE', `${data}`, id);
    }
    router.push('/login');
  };

  return (
    <div className='sm:flex sm:justify-between mb-6'>
      <p className='mr-2 mb-5 lg:mb-0'>Hi {name}</p>

      <button
        onClick={() => logout()}
        type='button'
        className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md'
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
