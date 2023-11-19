import React from 'react'
import PrivateRoute from '../components/PrivateRoute'
import Layout from '../components/Layout'
import Service from '../components/Service';
import { allServices } from '../assets';

const HireServices = () => {
  return (
    <PrivateRoute>
      <Layout>
        <h1 className='text-2xl font-light text-gray-800'>Hire Services</h1>

        <div className='overflow-x-scroll'>
          <table className='w-lg mt-10 table w-full shadow-md'>
            <thead className='bg-gray-800'>
              <tr className='text-white'>
                <th className='w-1/5 py-2'>Job</th>
                <th className='w-1/5 py-2'>Worker Name</th>
                <th className='w-1/5 py-2'>Distance</th>
                <th className='w-1/5 py-2'>Price</th>
                <th className='w-1/5 py-2'>Options</th>
              </tr>
            </thead>

            <tbody className='bg-white'>
              {allServices.map((service) => (
                <Service key={service.id} service={service} />
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </PrivateRoute>
  );
}

export default HireServices