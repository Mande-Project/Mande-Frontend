import Layout from '@/src/components/Layout'
import Payment from '@/src/components/Payment';
import PrivateRoute from '@/src/components/PrivateRoute'
import React from 'react'

const paymentHistory = [
  {
    "id": 1,
    "date": "2022-01-01",
    "amount": 100.00,
    "account": "Account 1",
    "workDone": "Labor 1"
  },
  {
    "id": 2,
    "date": "2022-01-02",
    "amount": 200.00,
    "account": "Account 2",
    "workDone": "Labor 2"
  },
  {
    "id": 3,
    "date": "2022-01-03",
    "amount": 300.00,
    "account": "Account 3",
    "workDone": "Labor 3"
  },
  {
    "id": 4,
    "date": "2022-01-04",
    "amount": 400.00,
    "account": "Account 4",
    "workDone": "Labor 4"
  },
  {
    "id": 5,
    "date": "2022-01-05",
    "amount": 500.00,
    "account": "Account 5",
    "workDone": "Labor 5"
  }
];

const Payments = () => {
  return (
    <PrivateRoute>
      <Layout>
        <h1 className='text-2xl font-light text-gray-800'>
          Payments Historial
        </h1>

        <div className='overflow-x-scroll'>
          <table className='w-lg mt-10 table w-full shadow-md'>
            <thead className='bg-gray-800'>
              <tr className='text-white'>
                <th className='w-1/5 py-2'>Date</th>
                <th className='w-1/5 py-2'>Amount</th>
                <th className='w-1/5 py-2'>Account</th>
                <th className='w-1/5 py-2'>Work Done</th>
                <th className='w-1/5 py-2'>Option</th>
              </tr>
            </thead>

            <tbody className='bg-white'>
              {paymentHistory.map((payment) => (
                <Payment
                  key={payment.id}
                  payment={payment}
                />
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </PrivateRoute>
  );
}

export default Payments