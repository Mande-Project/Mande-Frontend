import * as Yup from 'yup';

export const RegisterValidation = Yup.object().shape({
  first_name: Yup.string()
    .max(30, 'First name must not have over 30 letters')
    .required('First name is required'),
  last_name: Yup.string()
    .max(30, 'Last name must not have over 30 letters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Email is not valid') // showToast('success', `${data}`);

    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      'Email is not valid',
    )
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(60, 'Password must not have over 60 characters')
    .test(
      'numeric-password',
      'This password is entirely numeric.',
      (value) => {
        return !/^\d+$/.test(value);
      },
    )
    .required('Password is required'),
  re_password: Yup.string()
    .required('Password confirmation is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  phone: Yup.string()
    .min(7, 'Phone number must have at least 7 numbers')
    .max(10, 'Phone number must not have over 10 numbers')
    .required('Phone number is required and must not contain letters'),
  role: Yup.string().required('You need to choose a type of user'),
});