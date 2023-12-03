import { Badge, Dialog, Flex, Text } from '@radix-ui/themes';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';

const Service = ({ service }) => {
  const {
    id_worker_job,
    job,
    rating,
    price,
    first_name,
    last_name,
    distance,
    description,
    email,
    phone,
  } = service;

  const showBadgeRating = () => {
    if (rating === 0) {
      return <Badge color='gray'>Not rated yet</Badge>;
    }
    if (rating >= 4) {
      return <Badge color='green'>Rating: {rating.toFixed(2)}</Badge>;
    }
    if (rating >= 2) {
      return <Badge color='yellow'>Rating: {rating.toFixed(2)}</Badge>;
    }
    if (rating >= 0) {
      return <Badge color='red'>Rating: {rating.toFixed(2)}</Badge>;
    }
  };

  const showBadgeRating2 = () => {
    if (rating === 0) {
      return <Badge color='gray'>Not rated yet</Badge>;
    }
    if (rating >= 4) {
      return <Badge color='green'>{rating.toFixed(2)}</Badge>;
    }
    if (rating >= 2) {
      return <Badge color='yellow'> {rating.toFixed(2)}</Badge>;
    }
    if (rating >= 0) {
      return <Badge color='red'> {rating.toFixed(2)}</Badge>;
    }
  };

  const showDistance = (distance) => {
    const formattedDistance = (parseFloat(distance) / 1000).toFixed(2);
    return formattedDistance;
  };

  const handleContractService = () => {
    Router.push({
      pathname: '/contract-service/[id]',
      query: { id_worker_job },
    });
  };

  return (
    <tr>
      <td className='border px-4 py-2'>{job}</td>
      <td className='border px-4 py-2'>
        {first_name} {last_name}
      </td>
      <td className='border px-4 py-2'>{showDistance(distance)} km</td>
      <td className='border px-4 py-2'>${price}</td>
      <td className='border px-4 py-2'>{showBadgeRating2()}</td>
      <td className='border px-4 py-2'>
        <Dialog.Root>
          <Dialog.Trigger>
            <button
              type='button'
              className='flex w-full items-center justify-center rounded bg-green-600 px-4 py-2 text-xs font-bold uppercase text-white'
            >
              Show More
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
              <Dialog.Title>Service: {job}</Dialog.Title>
              <div className='flex gap-2'>{showBadgeRating()}</div>
            </div>
            <Dialog.Description size='2' mb='4'>
              <span className='font-bold'>Price:</span> <span>${price}</span>
            </Dialog.Description>

            <Flex direction='column' gap='3' className='mt-5'>
              <label>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Worker Name
                </Text>
                <Text>
                  {first_name} {last_name}
                </Text>
              </label>
              <div className='flex gap-10'>
                <label>
                  <Text as='div' size='2' mb='1' weight='bold'>
                    Worker Phone
                  </Text>
                  <Text>
                    {phone}
                  </Text>
                </label>
                <label>
                  <Text as='div' size='2' mb='1' weight='bold'>
                    Worker Email
                  </Text>
                  <Text>{email}</Text>
                </label>
              </div>
              <label>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Distance
                </Text>
                <Text>{showDistance(distance)} km</Text>
              </label>
              <label>
                <Text as='div' size='2' mb='1' weight='bold'>
                  Description
                </Text>
                <Text>{description}</Text>
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
              <Dialog.Close>
                <button
                  type='button'
                  className='flex w-full items-center justify-center rounded bg-green-600 px-4 py-2 text-xs font-bold uppercase text-white'
                  onClick={handleContractService}
                >
                  Contract Service
                </button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </td>
    </tr>
  );
};

Service.propTypes = {
  service: PropTypes.object.isRequired,
};

export default Service;
