import { loginRequest } from '@/src/api/auth';
import Layout from '@/src/components/Layout';
import showToast from '@/src/components/Toast';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useAuthStore } from '../store/auth';

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
    const id = toast.loading('Loading...');
    const res = await loginRequest(values);
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
      <h1 className='text-center text-2xl text-white font-light'>Login</h1>

      <div className='flex justify-center mt-5'>
        <div className='w-full max-w-sm'>
          <form
            className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
            onSubmit={formik.handleSubmit}
          >
            {formik.touched.typeUser && formik.errors.typeUser ? (
              <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                <p className='font-bold'>Error</p>
                <p>{formik.errors.typeUser}</p>
              </div>
            ) : null}

            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='email'
              >
                Email
              </label>

              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='email'
                type='email'
                placeholder='User Email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>

            {formik.touched.email && formik.errors.email ? (
              <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                <p className='font-bold'>Error</p>
                <p>{formik.errors.email}</p>
              </div>
            ) : null}

            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='password'
              >
                Password
              </label>

              <input
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='password'
                type='password'
                placeholder='User Password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>

            {formik.touched.password && formik.errors.password ? (
              <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                <p className='font-bold'>Error</p>
                <p>{formik.errors.password}</p>
              </div>
            ) : null}

            <input
              type='submit'
              className='bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900'
              value='Login'
            />

            <div className='w-full mt-5 p-2 text-center'>
              <p className='block text-gray-700 text-[1.1rem] font-bold'>
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
