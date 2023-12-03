import Layout from '@/src/components/Layout';
import PrivateRoute from '@/src/components/PrivateRoute';
import React, { useEffect, useState } from 'react';
import { getServicesUser } from '../api/services';
import Contract from '../components/Contract';
import { useAuthStore } from '../store/auth';

const MyServices = () => {
  const [user] = useAuthStore((state) => [state.user]);
  const [servicesUser, setServicesUser] = useState(null);
  const [filter, setFilter] = useState('All');

  const getMyServices = async (id, setServicesUserFunction) => {
    const res = await getServicesUser(id);
    if (res) {
      const { data } = res;
      setServicesUserFunction(data);
    }
  };

  useEffect(() => {
    console.log(servicesUser);
  }, [servicesUser]);

  useEffect(() => {
    const getServices = async () => {
      console.log(user.id);
      const res = await getServicesUser(user.id);
      if (res) {
        const { data } = res;
        setServicesUser(data);
      }
    };
    getServices();
  }, []);

  return (
    <PrivateRoute>
      <Layout>
        <h1 className='mb-5 text-2xl font-light text-gray-800'>My Services</h1>

        {servicesUser === null ? (
          <div className='mt-10'>Cargando...</div>
        ) : (
          <>
            <div className='mt-10'>
              <div style={{ width: '30%' }} className='flex flex-col gap-3'>
                <label htmlFor='serviceType'>Select a service type</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className='bg-white p-2'
                >
                  <option value='All'>All</option>
                  <option value='A'>Active</option>
                  <option value='F'>Finished</option>
                  <option value='C'>Canceled</option>
                </select>
              </div>
            </div>

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
                      <Contract
                        key={contract.id_service}
                        contract={contract}
                        getMyServices={getMyServices}
                        setServicesUser={setServicesUser}
                        setFilter={setFilter}
                      />
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
