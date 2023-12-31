import { Dialog, Flex, Text } from '@radix-ui/themes';
import React from 'react';
import PropTypes from 'prop-types';

const Payment = ({ payment }) => {
  const {  date, amount, account, workDone } = payment;

  return (
    <tr>
      <td className='border px-4 py-2'>{date}</td>
      <td className='border px-4 py-2'>${amount}</td>
      <td className='border px-4 py-2'>{account}</td>
      <td className='border px-4 py-2'>{workDone}</td>
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
            <Dialog.Title>Payment</Dialog.Title>
            <Dialog.Description size='2' mb='4'>
              Date: <span>{date}</span>
            </Dialog.Description>

            <Flex direction='column' gap='3' className='mt-5'>
              <label>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Amount
                </Text>
                <Text>{amount}</Text>
              </label>
              <label>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Account
                </Text>
                <Text>{account}</Text>
              </label>
              <label>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Work Done
                </Text>
                <Text>{workDone}</Text>
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

Payment.propTypes = {
  payment: PropTypes.object.isRequired,
};

export default Payment;
