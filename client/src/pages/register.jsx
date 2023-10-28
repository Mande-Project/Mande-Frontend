// import Layout from '@/src/components/Layout';
import { renderToast } from '@/src/components/Toast';
import useSelect from '@/src/hooks/useSelect';
import { typeOfUsers } from '@/src/utils/typeOfUsers';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { signupRequest } from '../api/auth';
import ErrorForm from '../components/ErrorForm';
import { useAuthStore } from '../store/auth';
import { RegisterValidation } from '../validation/registerValidation';

const Register = () => {
  const router = useRouter();
  const [role, SelectUser] = useSelect('', typeOfUsers);
  const [toSecPart, setToSecPart] = useState(false);
  const [isValidFirstPart, setIsValidFirstPart] = useState(false);
  const [tryToPass, setTryToPass] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

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
    },
    validationSchema: RegisterValidation,
    onSubmit: (values) => {
      const { first_name, last_name } = values;
      values.username = `${first_name}_${last_name}`;
      handleSignUp(values);
    },
  });

  const handleSignUp = async (values) => {
    const id = toast.loading('Loading...');
    const res = await signupRequest(values);
    if (res) {
      renderToast(id, res.type, res.message, () => {
        setAccountCreated(true);
      });
    }
    checkoutIsAuthenticated();
  };

  const checkoutIsAuthenticated = () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    if (isAuthenticated) {
      setTimeout(() => {
        router.push('/');
      }, 3000);
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
  }, [role]);

  useEffect(() => {
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
  }, [formik.errors]);

  const handleToSecondPart = (e) => {
    e.preventDefault();
    if (isValidFirstPart) {
      setToSecPart(true);
    } else {
      setTryToPass(true);
    }
  };

  return (
    <>
      <h1 className='text-center text-2xl font-light text-white'>Register</h1>

      <div className='flex h-full w-full flex-row flex-wrap justify-center'>
        <div className='mt-5 flex justify-center '>
          <div className='w-full max-w-sm'>
            <form
              className='mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md'
              style={{ width: '400px' }}
            >
              <div className='mb-4'>
                <label
                  className='mb-2 block text-sm font-bold text-gray-700'
                  htmlFor='role'
                >
                  Type of User
                </label>

                <div>
                  <SelectUser />
                </div>
              </div>

              {formik.values.role && (
                <>
                  <div className='mb-4'>
                    <label
                      className='mb-2 block text-sm font-bold text-gray-700'
                      htmlFor='first_name'
                    >
                      First Name
                    </label>

                    <input
                      className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
                      id='first_name'
                      type='text'
                      placeholder='User FirstName'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.first_name}
                      maxLength='30'
                    />
                  </div>

                  {(formik.touched.first_name && formik.errors.first_name) ||
                  (tryToPass && formik.errors.first_name) ? (
                    <ErrorForm description={formik.errors.first_name} />
                  ) : null}

                  <div className='mb-4'>
                    <label
                      className='mb-2 block text-sm font-bold text-gray-700'
                      htmlFor='last_name'
                    >
                      Last Name
                    </label>

                    <input
                      className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
                      id='last_name'
                      type='text'
                      placeholder='User LastName'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.last_name}
                      maxLength='30'
                    />
                  </div>

                  {(formik.touched.last_name && formik.errors.last_name) ||
                  (tryToPass && formik.errors.last_name) ? (
                    <ErrorForm description={formik.errors.last_name} />
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
                      maxLength='50'
                    />
                  </div>

                  {(formik.touched.email && formik.errors.email) ||
                  (tryToPass && formik.errors.email) ? (
                    <ErrorForm description={formik.errors.email} />
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
                      maxLength='60'
                    />
                  </div>

                  {(formik.touched.password && formik.errors.password) ||
                  (tryToPass && formik.errors.password) ? (
                    <ErrorForm description={formik.errors.password} />
                  ) : null}

                  <div className='mb-4'>
                    <label
                      className='mb-2 block text-sm font-bold text-gray-700'
                      htmlFor='re_password'
                    >
                      Confirm Password
                    </label>

                    <input
                      className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
                      id='re_password'
                      type='password'
                      placeholder='Confirm Password'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.re_password}
                      maxLength='60'
                    />
                  </div>

                  {(formik.touched.re_password && formik.errors.re_password) ||
                  (tryToPass && formik.errors.re_password) ? (
                    <ErrorForm description={formik.errors.re_password} />
                  ) : null}
                </>
              )}

              {!toSecPart && formik.values.role && (
                <button
                  className='uppercas mt-5 w-full bg-gray-800 p-2 text-center text-white hover:cursor-pointer hover:bg-gray-900'
                  value='Continue'
                  onClick={handleToSecondPart}
                >
                  Continue
                </button>
              )}

              {(!formik.values.role || !toSecPart) && (
                <div className='mt-5 w-full p-1 text-center'>
                  <p className='block text-[1.1rem] font-bold text-gray-700'>
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
          <div className='ml-10 mt-5 flex justify-center'>
            <div className='w-full max-w-sm'>
              <form
                className='mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md'
                onSubmit={formik.handleSubmit}
                style={{ width: '400px' }}
              >
                <div className='mb-4'>
                  <label
                    className='mb-2 block text-sm font-bold text-gray-700'
                    htmlFor='phone'
                  >
                    Phone Number
                  </label>

                  <input
                    className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
                    id='phone'
                    type='number'
                    placeholder='User Phonenumber'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                </div>

                {formik.touched.phone && formik.errors.phone ? (
                  <ErrorForm description={formik.errors.phone} />
                ) : null}

                <div className='mb-4'>
                  <label
                    className='mb-2 block text-sm font-bold text-gray-700'
                    htmlFor='residenceAddress'
                  >
                    Residence Address
                  </label>

                  <input
                    className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none'
                    id='residenceAddress'
                    type='text'
                    placeholder='User recidence address'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.residenceAddress}
                    maxLength='50'
                  />
                </div>

                {formik.touched.residenceAddress &&
                formik.errors.residenceAddress ? (
                  <ErrorForm description={formik.errors.residenceAddress} />
                ) : null}

                <input
                  type='submit'
                  className='uppercas mt-5 w-full bg-gray-800 p-2 text-white hover:cursor-pointer hover:bg-gray-900'
                  value='Register'
                />

                <div className='mt-5 w-full p-2 text-center'>
                  <p className='block text-[1.1rem] font-bold text-gray-700'>
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
    </>
  );
};

export default Register;
