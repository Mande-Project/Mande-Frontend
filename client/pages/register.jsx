import { registerClient, registerWorker } from '@/api/access';
import Layout from '@/components/Layout';
import showToast from '@/components/Toast';
import useSelect from '@/hooks/useSelect';
import { methodType, typeOfUsers } from '@/types';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const Register = () => {
  const router = useRouter();

  const [typeUser, SelectUser] = useSelect('', typeOfUsers);
  const [toSecPart, setToSecPart] = useState(false);
  const [isValidFirstPart, setIsValidFirstPart] = useState(false);
  const [tryToPass, setTryToPass] = useState(false);

  // Formik
  const formik = useFormik({
    initialValues: {
      typeUser: '',
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phone: '',
      residenceAddress: '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .max(30, 'Firstname must not have over 30 letters')
        .required('First name is required'),
      last_name: Yup.string()
        .max(30, 'Lastname must not have over 30 letters')
        .required('Last name is required'),
      email: Yup.string()
        .email('Email is not valid') // showToast('success', `${data}`);

        .matches(
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          'Email is not valid',
        )
        .required('Email is required'),
      password: Yup.string()
        .min(5, 'The password must not at least 5 characters')
        .max(60, 'The password must not have over 60 characters')
        .required('The password is required'),
      phone: Yup.string()
        .matches(/^[0-9]+$/, 'phone must contain only numbers')
        .min(7, 'Phone number must have at least 7 numbers')
        .max(10, 'Phone number must not have over 10 numbers')
        .required('Phone number is required'),
      residenceAddress: Yup.string()
        .min(5, 'Residence address must have at least 5 characters')
        .max(50, 'Residence address must not have over 50 characters')
        .required('Residence address is required'),
      typeUser: Yup.string().required('You need to choose a type of user'),
    }),
    onSubmit: (values) => {
      const { first_name, last_name, typeUser } = values;
      values.username = `${first_name}_${last_name}`;

      if (typeUser === 'CLIENT') {
        registerClientFunction(values);
      } else if (typeUser === 'WORKER') {
        registerWorkerFunction(values);
      } else {
        showToast('error', 'Typer of user unknown');
      }
    },
  });

  const registerClientFunction = async (values) => {
    const id = toast.loading('Loading...');
    try {
      const { data } = await registerClient(values);
      showToast('promiseS', `${data}`, id);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      const { data } = error.response;
      showToast('promiseE', `${data}`, id);
    }
  };

  const registerWorkerFunction = async (values) => {
    const id = toast.loading('Loading...');
    try {
      const { data } = await registerWorker(values);
      showToast('promiseS', `${data}`, id);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error) {
      const { data } = error.response;
      showToast('promiseE', `${data}`, id);
    }
  };

  useEffect(() => {
    const changeTypeUserOfFormik = () => {
      if (typeUser.value) {
        formik.setFieldValue('typeUser', typeUser.value);
      }
    };
    changeTypeUserOfFormik();

    const handleFormikErrorsChange = () => {
      const { typeUser, first_name, last_name, email, password } =
        formik.errors;
      setIsValidFirstPart(
        !typeUser && !email && !password && !first_name && !last_name,
      );
    };

    handleFormikErrorsChange();
  }, [typeUser, formik.errors]);

  const handleToSecondPart = (e) => {
    e.preventDefault();
    if (isValidFirstPart) {
      setToSecPart(true);
    } else {
      setTryToPass(true);
    }
  };

  return (
    <Fragment>
      <Layout>
        <h1 className='text-center text-2xl text-white font-light'>Register</h1>

        <div className='flex flex-row flex-wrap justify-center'>
          <div className='flex justify-center mt-5 '>
            <div className='w-full max-w-sm'>
              <form
                className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
                style={{ width: '400px' }}
              >
                <div className='mb-4'>
                  <label
                    className='block text-gray-700 text-sm font-bold mb-2'
                    htmlFor='typeUser'
                  >
                    Type of User
                  </label>

                  <div>
                    <SelectUser />
                  </div>
                </div>

                {formik.touched.typeUser && formik.errors.typeUser ? (
                  <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                    <p className='font-bold'>Error</p>
                    <p>{formik.errors.typeUser}</p>
                  </div>
                ) : null}

                {formik.values.typeUser && (
                  <>
                    <div className='mb-4'>
                      <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='first_name'
                      >
                        First Name
                      </label>

                      <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='first_name'
                        type='text'
                        placeholder='User FirstName'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.first_name}
                      />
                    </div>

                    {(formik.touched.first_name && formik.errors.first_name) ||
                    (tryToPass && formik.errors.first_name) ? (
                      <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                        <p className='font-bold'>Error</p>
                        <p>{formik.errors.first_name}</p>
                      </div>
                    ) : null}

                    <div className='mb-4'>
                      <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='last_name'
                      >
                        Last Name
                      </label>

                      <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id='last_name'
                        type='text'
                        placeholder='User LastName'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.last_name}
                      />
                    </div>

                    {(formik.touched.last_name && formik.errors.last_name) ||
                    (tryToPass && formik.errors.last_name) ? (
                      <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                        <p className='font-bold'>Error</p>
                        <p>{formik.errors.last_name}</p>
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

                    {(formik.touched.email && formik.errors.email) ||
                    (tryToPass && formik.errors.email) ? (
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

                    {(formik.touched.password && formik.errors.password) ||
                    (tryToPass && formik.errors.password) ? (
                      <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                        <p className='font-bold'>Error</p>
                        <p>{formik.errors.password}</p>
                      </div>
                    ) : null}
                  </>
                )}

                {!toSecPart && formik.values.typeUser && (
                  <button
                    className='bg-gray-800 text-center w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900'
                    value='Continue'
                    onClick={handleToSecondPart}
                  >
                    Continue
                  </button>
                )}

                {(!formik.values.typeUser || !toSecPart) && (
                  <div className='w-full mt-5 p-1 text-center'>
                    <p className='block text-gray-700 text-[1.1rem] font-bold'>
                      Already have an{' '}
                      <Link href='login'>
                        <span className='text-sky-800'>account</span> ?
                      </Link>
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>

          {formik.values.typeUser && toSecPart && (
            <div className='flex justify-center mt-5 ml-10'>
              <div className='w-full max-w-sm'>
                <form
                  className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
                  onSubmit={formik.handleSubmit}
                  style={{ width: '400px' }}
                >
                  <div className='mb-4'>
                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='phone'
                    >
                      Phone Number
                    </label>

                    <input
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      id='phone'
                      type='number'
                      placeholder='User Phonenumber'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone}
                    />
                  </div>

                  {formik.touched.phone && formik.errors.phone ? (
                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                      <p className='font-bold'>Error</p>
                      <p>{formik.errors.phone}</p>
                    </div>
                  ) : null}

                  <div className='mb-4'>
                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='residenceAddress'
                    >
                      Residence Address
                    </label>

                    <input
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      id='residenceAddress'
                      type='text'
                      placeholder='User recidence address'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.residenceAddress}
                    />
                  </div>

                  {formik.touched.residenceAddress &&
                  formik.errors.residenceAddress ? (
                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                      <p className='font-bold'>Error</p>
                      <p>{formik.errors.residenceAddress}</p>
                    </div>
                  ) : null}

                  <input
                    type='submit'
                    className='bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900'
                    value='Register'
                  />

                  <div className='w-full mt-5 p-2 text-center'>
                    <p className='block text-gray-700 text-[1.1rem] font-bold'>
                      Already have an{' '}
                      <Link href='login'>
                        <span className='text-sky-800'>account</span> ?
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </Fragment>
  );
};

export default Register;
