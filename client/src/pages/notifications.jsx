import Layout from '@/src/components/Layout';
import Notification from '@/src/components/Notification';
import PrivateRoute from '@/src/components/PrivateRoute';
import React, { useEffect, useState } from 'react';
import { getNotificationsUser } from '../api/notifications';

const notifications = [
  {
    id: 1,
    date: '2022-01-01',
    subject: 'Notificación 1',
    message:
      'Mensaje de la notificación 1 Mensaje de la notificación 1 Mensaje de la notificación 1 Mensaje de la notificación 1',
  },
  {
    id: 2,
    date: '2022-01-02',
    subject: 'Notificación 2',
    message: 'Mensaje de la notificación 2',
  },
  {
    id: 3,
    date: '2022-01-03',
    subject: 'Notificación 3',
    message:
      'Mensaje de la notificación 3 Mensaje de la notificación 3 Mensaje de la notificación 3',
  },
  {
    id: 4,
    date: '2022-01-04',
    subject: 'Notificación 4',
    message: 'Mensaje de la notificación 4',
  },
  {
    id: 5,
    date: '2022-01-05',
    subject: 'Notificación 5',
    message: 'Mensaje de la notificación 5',
  },
];

const Notifications = () => {
  const [notificationsUser, setNotificationsUser] = useState(null);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    setUserID(auth.state.user.id);
  }, []);

  useEffect(() => {
    if (userID == null) return;
    const getNotifications = async () => {
      const res = await getNotificationsUser(userID);
      setNotificationsUser(res);
    };
    getNotifications();
  }, [userID]);

  return (
    <PrivateRoute>
      <Layout>
        <h1 className='text-2xl font-light text-gray-800'>Notifications</h1>

        <div className='overflow-x-scroll'>
          <table className='w-lg mt-10 table w-full shadow-md'>
            <thead className='bg-gray-800'>
              <tr className='text-white'>
                <th className='w-1/5 py-2'>Date</th>
                <th className='w-1/5 py-2'>Subject</th>
                <th className='w-1/5 py-2'>Message</th>
                <th className='w-1/5 py-2'>Option</th>
              </tr>
            </thead>

            <tbody className='bg-white'>
              {notificationsUser != null &&
                notificationsUser.map((notification) => (
                  <Notification
                    key={notification.id}
                    notification={notification}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </PrivateRoute>
  );
};

export default Notifications;
