import * as Yup from 'yup';

export const LoginValidation = Yup.object().shape({
  email: Yup.string()
    .email("Email isn't valid")
    .required('Email is required'),
  password: Yup.string().required('The password is required'),
})