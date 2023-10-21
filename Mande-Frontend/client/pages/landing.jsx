import Layout from '@/components/Layout';
import useSelect from '@/hooks/useSelect';
import { typeOfUsers } from '@/types';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect } from 'react';
import * as Yup from 'yup';
import Header2 from '@/components/Header2';
const Lading = () => {
  return (
    <Header2 />

  )
};

export default Lading;
