// import Layout from '@/src/components/Layout';
import React from 'react';
import Layout from '../components/Layout';
import PrivateRoute from '../components/PrivateRoute';

const Dashboard = () => {
  return (
    <PrivateRoute>
      <Layout>
        {/* <Layout> */}
        <h1 className='text-2xl font-light text-gray-800'>Dashboard</h1>
        {/* </Layout> */}
      </Layout>
    </PrivateRoute>
  );
};

export default Dashboard;
