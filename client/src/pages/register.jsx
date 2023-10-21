import Layout from '@/src/components/Layout';
import showToast from '@/src/components/Toast';
import useSelect from '@/src/hooks/useSelect';
import { typeOfUsers } from '@/src/utils';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { signupRequest } from '../api/auth';
import { useAuthStore } from '../store/auth';

const Register = () => {
  const router = useRouter();

  const [role, SelectUser] = useSelect('', typeOfUsers);
  const [toSecPart, setToSecPart] = useState(false);
  const [isValidFirstPart, setIsValidFirstPart] = useState(false);
  const [tryToPass, setTryToPass] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [isLocated, setIsLocated] = useState(false);
  const options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };

  // Formik
  const formik = useFormik({
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      phone: '',
      role: '',
      password: '',
      re_password: '',
      residenceAddress: '',
      latitude: '',
      longitude: '',
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
        .min(8, 'The password must not at least 8 characters')
        .max(60, 'The password must not have over 60 characters')
        .test(
          'numeric-password',
          'This password is entirely numeric.',
          (value) => {
            return !/^\d+$/.test(value);
          },
        )
        .required('The password is required'),
      re_password: Yup.string()
        .required('The password confirmation is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      phone: Yup.string()
        .matches(/^[0-9]+$/, 'phone must contain only numbers')
        .min(7, 'Phone number must have at least 7 numbers')
        .max(10, 'Phone number must not have over 10 numbers')
        .required('Phone number is required'),
      // residenceAddress: Yup.string()
      //   .min(5, 'Residence address must have at least 5 characters')
      //   .max(50, 'Residence address must not have over 50 characters')
      //   .required('Residence address is required'),
      role: Yup.string().required('You need to choose a type of user'),
    }),
    onSubmit: (values) => {
      const { first_name, last_name } = values;
      values.username = `${first_name}_${last_name}`;

      if (!isLocated) {
        if (values.residenceAddress === '') {
          showToast('warning', 'You have to put your location manually');
          return;
        }
      }

      handleSignUp(values);
    },
  });

  const success = (pos) => {
    var crd = pos.coords;
    console.log('Your current position is:');
    formik.setFieldValue('latitude', crd.latitude);
    formik.setFieldValue('longitude', crd.longitude);
    showToast('success', 'Your location has been set');
    setIsLocated(true);
  };

  function errors() {
    showToast('warning', 'You have to put your location manually');
  }

  const locateUser = () => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(function (result) {
          if (result.state === 'granted') {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === 'prompt') {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === 'denied') {
            showToast('warning', 'Please enable location to use this app');
          }
        });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    console.log(isLocated);
    if (!isLocated) {
      locateUser();
    }
  }, []);

  const handleSignUp = async (values) => {
    const id = toast.loading('Loading...');
    const res = await signupRequest(values);
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
      setAccountCreated(true);
      showToast('promise_success', message, id);
    }
  };

  if (accountCreated) {
    setTimeout(() => {
      router.push('/login');
    }, 3000);
  }

  useEffect(() => {
    const changeTypeUserOfFormik = () => {
      if (role.value) {
        formik.setFieldValue('role', role.value);
      }
    };
    changeTypeUserOfFormik();

    const handleFormikErrorsChange = () => {
      const { role, first_name, last_name, email, password, re_password } =
        formik.errors;
      setIsValidFirstPart(
        !role &&
          !email &&
          !password &&
          !re_password &&
          !first_name &&
          !last_name,
      );
    };

    handleFormikErrorsChange();
  }, [role, formik.errors]);

  const handleToSecondPart = (e) => {
    e.preventDefault();
    if (isValidFirstPart) {
      setToSecPart(true);
    } else {
      setTryToPass(true);
    }
  };

  return (
    <Layout>
      <h1 className='text-center text-2xl text-white font-light'>Register</h1>

      <div className='flex flex-row flex-wrap justify-center w-full h-full'>
        <div className='flex justify-center mt-5 '>
          <div className='w-full max-w-sm'>
            <form
              className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
              style={{ width: '400px' }}
            >
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='role'
                >
                  Type of User
                </label>

                <div>
                  <SelectUser />
                </div>
              </div>

              {formik.touched.role && formik.errors.role ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.role}</p>
                </div>
              ) : null}

              {formik.values.role && (
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

                  <div className='mb-4'>
                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='re_password'
                    >
                      Confirm Password
                    </label>

                    <input
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      id='re_password'
                      type='password'
                      placeholder='Confirm Password'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.re_password}
                    />
                  </div>

                  {(formik.touched.re_password && formik.errors.re_password) ||
                  (tryToPass && formik.errors.re_password) ? (
                    <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                      <p className='font-bold'>Error</p>
                      <p>{formik.errors.re_password}</p>
                    </div>
                  ) : null}
                </>
              )}

              {!toSecPart && formik.values.role && (
                <button
                  className='bg-gray-800 text-center w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900'
                  value='Continue'
                  onClick={handleToSecondPart}
                >
                  Continue
                </button>
              )}

              {(!formik.values.role || !toSecPart) && (
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

        {formik.values.role && toSecPart && (
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

                {!isLocated && (
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
                )}

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
  );
};

export default Register;
