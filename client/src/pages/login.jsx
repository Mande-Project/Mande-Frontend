import Layout from '@/src/components/Layout';
import showToast from '@/src/components/Toast';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useAuthStore } from '../store/auth';
import { loginRequest } from '../api/auth';

const Login = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email isn't valid")
        .required('Email is required'),
      password: Yup.string().required('The password is required'),
    }),
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const handleLogin = async (values) => {
    console.log(values);
    const id = toast.loading('Loading...');
    const res = await loginRequest(values);
    console.log(res)
    renderToast(id, res.type, res.message);
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (isAuthenticated) {
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  };

  const renderToast = (id, type, message) => {
    if (type === 'error') {
      showToast('promise_error', message, id);
    } else {
      showToast('promise_success', message, id);
    }
  };

  return (
    <Layout>
      <h1 data-testid="login-title" className='text-center text-2xl font-light text-white'>Login</h1>

      <div className='mt-5 flex justify-center'>
        <div className='w-full max-w-sm'>
          <form
            className='mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md'
            onSubmit={formik.handleSubmit}
          >
            {formik.touched.typeUser && formik.errors.typeUser ? (
              <div className='my-2 border-l-4 border-red-500 bg-red-100 p-4 text-red-700'>
                <p className='font-bold'>Error</p>
                <p>{formik.errors.typeUser}</p>
              </div>
            ) : null}

            <div className='mb-4'>
              <label
                className='mb-2 block text-sm font-bold text-gray-700'
                htmlFor='email'
              >
                Email
              </label>

              <input
                className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
                id='email'
                type='email'
                placeholder='User Email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>

            {formik.touched.email && formik.errors.email ? (
              <div className='my-2 border-l-4 border-red-500 bg-red-100 p-4 text-red-700'>
                <p className='font-bold'>Error</p>
                <p>{formik.errors.email}</p>
              </div>
            ) : null}

            <div className='mb-4'>
              <label
                className='mb-2 block text-sm font-bold text-gray-700'
                htmlFor='password'
              >
                Password
              </label>

              <input
                className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
                id='password'
                type='password'
                placeholder='User Password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>

            {formik.touched.password && formik.errors.password ? (
              <div className='my-2 border-l-4 border-red-500 bg-red-100 p-4 text-red-700'>
                <p className='font-bold'>Error</p>
                <p>{formik.errors.password}</p>
              </div>
            ) : null}

            <input
              type='submit'
              className='uppercas mt-5 w-full bg-gray-800 p-2 text-white hover:cursor-pointer hover:bg-gray-900'
              value='Login'
            />

            <div className='mt-5 w-full p-2 text-center'>
              <p className='block text-[1.1rem] font-bold text-gray-700'>
                Do you want to{' '}
                <Link href='register'>
                  <span className='text-sky-800'>register</span> ?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
