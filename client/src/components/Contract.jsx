import { Badge, Dialog, Flex, Text } from '@radix-ui/themes';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

import PropTypes from 'prop-types';
import { updateServiceAPI } from '../api/services';

const Contract = ({ contract }) => {
  const [ratingM, setRatingM] = useState('');
  let {
    id_service,
    date,
    c_first_name,
    c_last_name,
    w_first_name,
    w_last_name,
    job,
    description,
    cost,
    rating,
    paid,
    status,
  } = contract;

  const showBadgeRating = () => {
    if (rating === null) {
      return <Badge color='gray'>Not rated yet</Badge>;
    }
    if (rating >= 4) {
      return <Badge color='green'>Rating: {rating}</Badge>;
    }
    if (rating >= 2) {
      return <Badge color='yellow'>Rating: {rating}</Badge>;
    }
    if (rating >= 0) {
      return <Badge color='red'>Rating: {rating}</Badge>;
    }
  };

  const showBadgePaid = () => {
    if (paid) {
      return <Badge color='green'>Was Paid</Badge>;
    }
    if (!paid) {
      return <Badge color='red'>Hasn't paid</Badge>;
    }
  };

  const showBadgeFinished = () => {
    if (status === 'F') {
      return <Badge color='green'>Finished</Badge>;
    }
    if (status === 'A') {
      return <Badge color='yellow'>Active</Badge>;
    } else {
      return <Badge color='gray'>Cancelled</Badge>;
    }
  };

  const handleFinishContract = () => {
    if (ratingM === '' || isNaN(ratingM))  {
      Swal.fire(
        'Error',
        'Please add a rating before finishing the contract, it must be a number',
        'error',
      );
      return;
    }
    
    const finishedContract = {
      id_service: id_service,
      status: 'F',
      rating: ratingM,
    }
    
    const getServices = async () => {
      await updateServiceAPI(finishedContract);
    };
    getServices();
    Swal.fire('Successfully', 'The contract was finished correctly', 'success').then(() => {
      window.location.reload();
    });
  };

  return (
    <tr>
      <td className='border px-4 py-2'>{date}</td>
      <td className='border px-4 py-2'>{job}</td>
      <td className='border px-4 py-2'>{w_first_name + ' ' + w_last_name}</td>
      <td className='border px-4 py-2'>{c_first_name + ' ' + c_last_name}</td>
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
            <div className='flex justify-between'>
              <Dialog.Title>Contract</Dialog.Title>
              <div className='flex gap-2'>
                {showBadgeRating()}
                {showBadgePaid()}
                {showBadgeFinished()}
              </div>
            </div>
            <Dialog.Description size='2' mb='4'>
              Date: <span>{date}</span>
            </Dialog.Description>

            <Flex direction='column' gap='3' className='mt-5'>
              <label>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Client Name
                </Text>
                <Text>{w_first_name + ' ' + w_last_name}</Text>
              </label>
              <label>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Worker Name
                </Text>
                <Text>{c_first_name + ' ' + c_last_name}</Text>
              </label>
              <label>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Job
                </Text>
                <Text>{job}</Text>
              </label>
              <label>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Description
                </Text>
                <Text>{description}</Text>
              </label>
              <label>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Amount
                </Text>
                <Text>${cost}</Text>
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
              {status === 'A' && (
                <div>
                  <label htmlFor='rating'>Rating:</label>
                  <input
                    className='mt-1 w-5/6 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    type='number'
                    id='rating'
                    name='rating'
                    value={ratingM}
                    onChange={(e) => setRatingM(e.target.value)}
                  />
                </div>
              )}
              {status === 'A' && (
                <Dialog.Close>
                  <button
                    type='button'
                    className='flex w-full items-center justify-center rounded bg-green-600 px-4 py-2 text-xs font-bold uppercase text-white'
                    onClick={handleFinishContract}
                  >
                    Finish Contract
                  </button>
                </Dialog.Close>
              )}
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </td>
    </tr>
  );
};

Contract.propTypes = {
  contract: PropTypes.object.isRequired,
};

export default Contract;
