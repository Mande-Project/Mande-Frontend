import Router from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';

const Worker = ({ worker }) => {
  const { name, company, email, id } = worker;

  const editarCliente = () => {
    Router.push({
      pathname: '/editworker/[id]',
      query: { id },
    });
  };

  return (
    <tr>
      <td className='border px-4 py-2'>{name}</td>
      <td className='border px-4 py-2'>{company}</td>
      <td className='border px-4 py-2'>{email}</td>
      <td className='border px-4 py-2'>
        <button
          type='button'
          className='flex w-full items-center justify-center rounded bg-green-600 px-4 py-2 text-xs font-bold uppercase text-white'
          onClick={() => editarCliente()}
        >
          Editar
          <svg
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            viewBox='0 0 24 24'
            className='ml-2 h-4 w-4'
          >
            <path d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'></path>
          </svg>
        </button>
      </td>
    </tr>
  );
};

Worker.propTypes = {
  worker: PropTypes.shape({
    name: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Worker;
