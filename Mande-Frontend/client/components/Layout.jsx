import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  // Routing hook
  const router = useRouter();
  console.log(router.pathname);

  return (
    <Fragment>
      {router.pathname === '/login' || router.pathname === '/register'  ? (
        <div className='bg-gray-800 min-h-screen flex flex-col justify-center'>
          <div>{children}</div>
        </div>
      ) : (
        <div className='bg-gray-200 min-h-screen'>
          <div className='flex min-h-screen'>
            <Sidebar />

            <main className='sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5'>
              <Header />
              {children}
            </main>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Layout;
