// import Layout from '@/src/components/Layout';
import React, { Suspense } from 'react';
import Layout from '../components/Layout';
import PrivateRoute from '../components/PrivateRoute';
import Worker from '../components/Worker';
import { workers } from '../assets';

const Dashboard = () => {
  console.log("wiwdidwi")
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <PrivateRoute>
          <Layout>
            <h1 className='text-2xl font-light text-gray-800'>Clientes</h1>

            <div className='overflow-x-scroll'>
              <table className='w-lg mt-10 table w-full shadow-md'>
                <thead className='bg-gray-800'>
                  <tr className='text-white'>
                    <th className='w-1/5 py-2'>Name</th>
                    <th className='w-1/5 py-2'>Company</th>
                    <th className='w-1/5 py-2'>Email</th>
                    <th className='w-1/5 py-2'>Editar</th>
                  </tr>
                </thead>

                <tbody className='bg-white'>
                  {workers.map((worker) => (
                    <Worker key={worker.id} worker={worker} />
                  ))}
                </tbody>
              </table>
            </div>
          </Layout>
        </PrivateRoute>
      </Suspense>
    </>
  );
};

export default Dashboard;
