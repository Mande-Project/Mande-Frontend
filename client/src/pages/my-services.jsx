import Layout from '@/src/components/Layout';
import PrivateRoute from '@/src/components/PrivateRoute';
import React, { useEffect, useState } from 'react';
import Contract from '../components/Contract';
import { getServicesUser } from '../api/services';

const MyServices = () => {
  const [servicesUser, setServicesUser] = useState(null);
  const [userID, setUserID] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    setUserID(auth.state.user.id);
  }, []);

  useEffect(() => {
    if (userID == null) return;
    const getServices = async () => {
      const res = await getServicesUser(userID);
      const { data } = res;
      setServicesUser(data);
    };
    getServices();
  }, [userID]);

  return (
    <PrivateRoute>
      <Layout>
        <h1 className='mb-5 text-2xl font-light text-gray-800'>My Services</h1>

        {servicesUser === null ? (
          <div className='mt-10'>Cargando...</div>
        ) : (
          <>
            <label htmlFor='serviceType' className='mr-2'>
              Select a service type
            </label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value='All'>All</option>
              <option value='A'>Active</option>
              <option value='F'>Finished</option>
              <option value='C'>Canceled</option>
            </select>

            <div className='overflow-x-scroll'>
              <table className='w-lg mt-10 table w-full shadow-md'>
                <thead className='bg-gray-800'>
                  <tr className='text-white'>
                    <th className='w-1/5 py-2'>Date</th>
                    <th className='w-1/5 py-2'>Job</th>
                    <th className='w-1/5 py-2'>Client</th>
                    <th className='w-1/5 py-2'>Worker</th>
                    <th className='w-1/5 py-2'>Option</th>
                  </tr>
                </thead>

                <tbody className='bg-white'>
                  {servicesUser
                    .filter(
                      (contract) =>
                        filter === 'All' || contract.status === filter,
                    )
                    .map((contract) => (
                      <Contract key={contract.id_service} contract={contract} />
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </Layout>
    </PrivateRoute>
  );
};

export default MyServices;
