import Layout from '@/components/Layout';
import useSelect from '@/hooks/useSelect';
import { typeOfUsers,  methodType} from '@/types';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect } from 'react';
import * as Yup from 'yup';

const Register = () => {
  const router = useRouter();

  const [typeUser, SelectUser] = useSelect('', typeOfUsers);
  const [paymentMethod, SelectPaymentMethod] = useSelect('', methodType);

  // Formik
  const formik = useFormik({
    initialValues: {
      typeUser: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      recidenseAddres: '',
      paymentMethod: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email isn't valid")
        .required('Email is required'),
      password: Yup.string().required('The password is required'),
      typeUser: Yup.string().required('You need to choose a type of user'),
    }),
    onSubmit: (valores) => {
      const { firstName, lastName, email, password, phoneNumber, recidenseAddres, paymentMethod, typeUser } = valores;
      console.log(valores);
    },
  });

  useEffect(() => {
    const changeTypeUserOfFormik = () => {
      if (typeUser.value) {
        formik.setFieldValue('typeUser', typeUser.value);
      }
    };
    changeTypeUserOfFormik();
  }, [typeUser]);

  useEffect(() => {
    const changePaymentMethodFormik = () => {
      if (paymentMethod.value) {
        formik.setFieldValue('paymentMethod', paymentMethod.value);
      }
    };
    changePaymentMethodFormik ();
  }, [paymentMethod]);

  return (
    <Fragment>
      <Layout>
        <h1 className='text-center text-2xl text-white font-light'>Register</h1>

        <div className='flex justify-center mt-5'>
          <div className='w-full max-w-sm'>
            <form
              className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
              onSubmit={formik.handleSubmit}
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
                  <p className='font-bold'>Important</p>
                  <p>{formik.errors.typeUser}</p>
                </div>
              ) : null}

              {formik.values.typeUser && (
                <>
                <div className='mb-4'>
                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='firstName'
                    >
                      First Name
                    </label>

                    <input
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      id='firstName'
                      type='firstName'
                      placeholder='User FirstName'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                    />
                  </div>
                <div className='mb-4'>
                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='lastName'
                    >
                      Last Name
                    </label>

                    <input
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      id='lastName'
                      type='lastName'
                      placeholder='User LastName'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                    />
                  </div>
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
                  <div className='mb-4'>
                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='phoneNumber'
                    >
                      Phone Number
                    </label>

                    <input
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      id='phoneNumber'
                      type='phoneNumber'
                      placeholder='User Phonenumber'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phoneNumber}
                    />
                  </div>
                  <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='paymentMethod'
                >
                  Type of Payment Method
                </label>

                <div>
                  <SelectPaymentMethod />
                </div>

                {formik.touched.paymentMethod && formik.errors.paymentMethod ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Important</p>
                  <p>{formik.errors.paymentMethod}</p>
                </div>
              ) : null}
              </div>
                  <div className='mb-4'>
                    <label
                      className='block text-gray-700 text-sm font-bold mb-2'
                      htmlFor='recidenseAddres'
                    >
                      Recidense Addres
                    </label>

                    <input
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      id='recidenseAddres'
                      type='recidenseAddres'
                      placeholder='User recidense address'
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.recidenseAddres}
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
                </>
              )}

              <input
                type='submit'
                className='bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900'
                value='Iniciar Sesión'
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
      </Layout>
    </Fragment>
  );
};

export default Register;
