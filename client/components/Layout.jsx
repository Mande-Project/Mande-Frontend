import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  // Routing hook
  const router = useRouter();
  console.log(router.pathname);

  return (
    <Fragment>
      {router.pathname === '/login' || router.pathname === '/register' ? (
        <div className='bg-gray-800 min-h-screen flex flex-col justify-center'>
          <div>
            <ToastContainer
              position='top-right'
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss={false}
              rtl={false}
              draggable
              pauseOnHover
              theme='dark'
            />
            {children}
          </div>
        </div>
      ) : (
        <div className='bg-gray-200 min-h-screen'>
          <div className='flex min-h-screen'>
            <Sidebar />

            <main className='sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5'>
              <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme='dark'
              />
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
