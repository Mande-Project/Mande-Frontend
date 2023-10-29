import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
const logo = '/logo.ico';

const Index = () => {
  return (
    <header className='flex min-h-screen flex-col items-center justify-center bg-gray-800 py-20 text-white'>
      <div className='mb-8 text-center'>
        <h1 className='text-4xl font-extrabold tracking-tight text-gray-200 md:text-6xl'>
          Bienvenido A MANDE
        </h1>
        <p className='mt-2 text-lg text-gray-200 md:text-xl'>
          Haciendo el trabajo por ti, para que puedas disfrutar de lo más
          importante
        </p>
      </div>
      <div className='mb-8'>
        <Link href='/login'>
          <button className='rounded-full bg-blue-800 px-6 py-3 text-lg font-semibold text-white transition duration-300 ease-in-out hover:bg-blue-900 focus:bg-blue-900 md:px-8 md:py-4 md:text-xl'>
            Login
          </button>
        </Link>

        <Link href='/register'>
          <button className='ml-4 rounded-full border border-white px-6 py-3 text-lg font-semibold text-white transition duration-300 ease-in-out hover:text-blue-800 focus:text-blue-800 md:px-8 md:py-4 md:text-xl'>
            Register
          </button>
        </Link>
      </div>
      <div className='mb-8 h-40 w-40'>
        <Image
          src={logo}
          alt='Logo de MANDE'
          width={160}
          height={160}
          className='rounded-full shadow-lg'
        />
      </div>
    </header>
  );
};

export default Index;
