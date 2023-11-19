import {  Dialog, Flex, Text } from '@radix-ui/themes';
import PropTypes from 'prop-types';
import React from 'react';

const Notification = ({ notification }) => {
  const {  date, subject, message } = notification;

  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  };

  return (
    <tr>
      <td className='border px-4 py-2'>{date}</td>
      <td className='border px-4 py-2'>{truncateString(subject, 25)}</td>
      <td className='border px-4 py-2'>{truncateString(message, 25)}</td>
      <td className='border px-4 py-2'>
        <Dialog.Root>
          <Dialog.Trigger>
            <button
              type='button'
              className='flex w-full items-center justify-center rounded bg-green-600 px-4 py-2 text-xs font-bold uppercase text-white'
            >
              Show All
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='ml-2 h-4 w-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </button>
          </Dialog.Trigger>

          <Dialog.Content style={{ maxWidth: 450 }}>
            <Dialog.Title>Notification</Dialog.Title>
            <Dialog.Description size='2' mb='4'>
              Date: <span>{date}</span>
            </Dialog.Description>

            <Flex direction='column' gap='3' className='mt-5'>
              <label>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Subject
                </Text>
                <Text>{subject}</Text>
              </label>
              <label>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Messgae
                </Text>
                <Text>{message}</Text>
              </label>
            </Flex>

            <Flex gap='3' mt='4' justify='end'>
              <Dialog.Close>
                <button
                  type='button'
                  className='flex w-full items-center justify-center rounded bg-gray-800 px-4 py-2 text-xs font-bold uppercase text-white'
                >
                  Close
                </button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </td>
    </tr>
  );
};

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default Notification;
