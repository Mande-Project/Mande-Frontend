import { useRouter } from 'next/router';
import React, { Fragment, Suspense} from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import Sidebar from './Sidebar';

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <Fragment>
      {router.pathname === '/login' ||
      router.pathname === '/register' ||
      router.pathname.startsWith('/activate/') ? (
        <div className='flex min-h-screen flex-col justify-center bg-gray-800'>
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
        <>
          <div className='min-h-screen bg-gray-200'>
            <div className='flex min-h-screen'>
              <Sidebar />

              <main className='p-5 sm:min-h-screen sm:w-2/3 xl:w-4/5'>
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
                <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              </main>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Layout;
