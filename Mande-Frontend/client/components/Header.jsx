import React from 'react';

const Header = () => {
  const { name } = { name: 'Test Name' };

  return (
    <div className='flex justify-end mb-6'>
      <p className='mr-2'>Hola: {name}</p>
    </div>
  );
};

export default Header;
