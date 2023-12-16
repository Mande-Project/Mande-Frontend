import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const EditUser = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/me/');
        setUserData(response.data);
        Object.keys(response.data).forEach((key) => {
          setValue(key, response.data[key]);
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.put('/api/users/me/', data);
      console.log('User data updated:', response.data);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-800'>
      <div className='w-full max-w-md'>
        <form
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className='text-2xl font-bold mb-6 text-gray-800'>Edit User</h1>

          {userData && (
            <>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Email:
                </label>
                <input
                  {...register('email')}
                  type='text'
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  disabled
                />
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  First Name:
                </label>
                <input
                  {...register('first_name')}
                  type='text'
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Last Name:
                </label>
                <input
                  {...register('last_name')}
                  type='text'
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Phone:
                </label>
                <input
                  {...register('phone')}
                  type='text'
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Password:
                </label>
                <input
                  {...register('password')}
                  type='password'
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </div>

              <div className='mb-6'>
                <label className='block text-gray-700 text-sm font-bold mb-2'>
                  Confirm Password:
                </label>
                <input
                  {...register('confirm_password')}
                  type='password'
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                />
              </div>

              <div className='flex items-center justify-between'>
                <button
                  className='bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Save Changes
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditUser;
