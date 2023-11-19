import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Sidebar = () => {
  // Routing hook
  const router = useRouter();
  console.log(router.pathname)

  return (
    <aside className='bg-gray-800 p-5 sm:min-h-screen sm:w-1/3 xl:w-1/5'>
      <div>
        <p className='text-2xl font-black text-white'>MANDE</p>
      </div>

      <nav className='mt-5 list-none'>
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
            router.pathname === '/buscar' ? 'bg-blue-800 p-2' : 'p-2'
          }
        >
          <Link href='/buscar' className='block text-white'>
            Buscar
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
