import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Sidebar = () => {
  // Routing hook
  const router = useRouter();

  return (
    <aside className='bg-gray-800 p-5 sm:min-h-screen sm:w-1/3 xl:w-1/5'>
      <div className='fixed w-full max-w-[200px]'>
        <div>
          <p className='text-2xl font-black text-white'>MANDE</p>
        </div>

        <nav className='mt-5 list-none'>
          <div>
            <li
              className={
                router.pathname === '/dashboard' ? 'bg-blue-800 p-2' : 'p-2'
              }
            >
              <Link href='/dashboard' className='block text-white'>
                Dashboard
              </Link>
            </li>
            <li
              className={
                router.pathname === '/hire-services' ? 'bg-blue-800 p-2' : 'p-2'
              }
            >
              <Link href='/hire-services' className='block text-white'>
                Hire Services
              </Link>
            </li>
            <li
              className={
                router.pathname === '/my-services' ? 'bg-blue-800 p-2' : 'p-2'
              }
            >
              <Link href='/my-services' className='block text-white'>
                My Services
              </Link>
            </li>
            <li
              className={
                router.pathname === '/notifications' ? 'bg-blue-800 p-2' : 'p-2'
              }
            >
              <Link href='/notifications' className='block text-white'>
                Notifications
              </Link>
            </li>
          </div>
          <div className='mt-10'> 
            <li
              className={
                router.pathname === '/choose-job' ? 'bg-blue-800 p-2' : 'p-2'
              }
            >
              <Link href='/choose-job' className='block text-white'>
                Choose Job
              </Link>
            </li>
          </div>
          {/* <li
            className={
              router.pathname === '/payments' ? 'bg-blue-800 p-2' : 'p-2'
            }
            >
            <Link href='/payments' className='block text-white'>
            Payments
            </Link>
          </li> */}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
