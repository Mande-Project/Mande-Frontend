import { verify } from '@/src/api/auth';
import Layout from '@/src/components/Layout';
import showToast from '@/src/components/Toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ActivateAccount = () => {
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  if (verified) {
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  }

  const verifyAccount = async () => {
    const { uid, token } = router.query;
    const id = toast.loading('Loading...');
    const res = await verify(uid, token);
    renderToast(id, res.type, res.message);
  };

  const renderToast = (id, type, message) => {
    if (type === 'error') {
      showToast('promise_error', message, id);
    } else {
      setVerified(true);
      showToast('promise_success', message, id);
    }
  };

  return (
    <Layout>
      <h1 className='text-center text-2xl text-white font-light'>
        Verify your Account
      </h1>

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-sm'>
          <div className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-lg text-center font-bold mb-2'
                htmlFor='email'
              >
                Please press the button to verify your account
              </label>

              <input
                type='button'
                className='bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900'
                value='Verify'
                onClick={verifyAccount}
              />
            </div>

            <div className='w-full mt-5 p-2 text-center'>
              <p className='block text-gray-700 text-[1.1rem] font-bold'>
                Do you want to{' '}
                <Link href='/register'>
                  <span className='text-sky-800'>go back</span> ?
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ActivateAccount;
