// import Layout from '@/src/components/Layout';
import React, { Suspense } from 'react';
import Layout from '../components/Layout';
import PrivateRoute from '../components/PrivateRoute';
const Dashboard = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <PrivateRoute>
          <Layout>
            <h1 className='text-2xl font-light text-gray-800'>Navega por las distintas paginas que ofrece nuestra aplicación</h1>
          </Layout>
        </PrivateRoute>
      </Suspense>
    </>
  );
};

export default Dashboard;
