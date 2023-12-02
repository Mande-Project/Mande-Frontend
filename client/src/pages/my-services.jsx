import Layout from '@/src/components/Layout';
import PrivateRoute from '@/src/components/PrivateRoute';
import React, { useEffect, useState } from 'react';
import Contract from '../components/Contract';
import { getServicesUser } from '../api/services';

// const myServices = [
//   {
//     id: 1,
//     date: '2022-01-01',
//     clientName: 'Client 1',
//     workerName: 'Worker 1',
//     job: 'Job 1',
//     description: 'Description 1',
//     amount: 100.0,
//     rating: null,
//     paid: true,
//     finished: true,
//   },
//   {
//     id: 2,
//     date: '2022-01-02',
//     clientName: 'Client 2',
//     workerName: 'Worker 2',
//     job: 'Job 2',
//     description: 'Description 2',
//     amount: 200.0,
//     rating: 4,
//     paid: false,
//     finished: true,
//   },
//   {
//     id: 3,
//     date: '2022-01-03',
//     clientName: 'Client 3',
//     workerName: 'Worker 3',
//     job: 'Job 3',
//     description: 'Description 3',
//     amount: 300.0,
//     rating: null,
//     paid: true,
//     finished: false,
//   },
//   {
//     id: 4,
//     date: '2022-01-04',
//     clientName: 'Client 4',
//     workerName: 'Worker 4',
//     job: 'Job 4',
//     description: 'Description 4',
//     amount: 400.0,
//     rating: 2,
//     paid: false,
//     finished: false,
//   },
//   {
//     id: 5,
//     date: '2022-01-05',
//     clientName: 'Client 5',
//     workerName: 'Worker 5',
//     job: 'Job 5',
//     description: 'Description 5',
//     amount: 500.0,
//     rating: 1,
//     paid: true,
//     finished: true,
//   },
//   {
//     id: 6,
//     date: '2022-01-06',
//     clientName: 'Client 6',
//     workerName: 'Worker 6',
//     job: 'Job 6',
//     description: 'Description 6',
//     amount: 600.0,
//     rating: 5,
//     paid: false,
//     finished: false,
//   },
// ];

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
              {servicesUser != null &&
                servicesUser
                  .filter(
                    (contract) =>
                      filter === 'All' || contract.status === filter,
                  )
                  .map((contract) => (
                    <Contract key={contract.id} contract={contract} />
                  ))}
            </tbody>
            {/* <tbody className='bg-white'>
              {myServices != null &&
                myServices.map((contract) => (
                  <Contract key={contract.id} contract={contract} />
                ))}
            </tbody> */}
          </table>
        </div>
      </Layout>
    </PrivateRoute>
  );
};

export default MyServices;
