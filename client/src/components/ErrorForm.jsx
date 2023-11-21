import React from 'react'
import PropTypes from 'prop-types';

const ErrorForm = ({description}) => {
  return (
    <div className='my-2 border-l-4 border-red-500 bg-red-100 p-4 text-red-700'>
      <p className='font-bold'>Error</p>
      <p>{description}</p>
    </div>
  );
}

ErrorForm.propTypes = {
  description: PropTypes.string.isRequired,
};

export default ErrorForm