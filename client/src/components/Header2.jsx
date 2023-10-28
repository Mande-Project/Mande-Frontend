import React from 'react';
import Image from 'next/image';

const logo = '/logo.ico'; 

const Header2 = () => {
  return (
    <header className="min-h-screen flex flex-col items-center justify-center bg-gray-800 text-white py-20">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-blue-800">
          Bienvenido A MANDE
        </h1>
        <p className="text-lg md:text-xl mt-2 text-blue-700">
          "Haciendo el trabajo por ti, para que puedas disfrutar de lo más importante."
        </p>
      </div>
      <div className="mb-8">
        <button className="px-6 py-3 md:px-8 md:py-4 bg-blue-800 hover:bg-blue-900 focus:bg-blue-900 text-white text-lg md:text-xl font-semibold rounded-full transition duration-300 ease-in-out">
          Login
        </button>
        <button className="ml-4 px-6 py-3 md:px-8 md:py-4 border border-white text-white text-lg md:text-xl font-semibold rounded-full hover:text-blue-800 focus:text-blue-800 transition duration-300 ease-in-out">
          Explore
        </button>
      </div>
      <div className="w-40 h-40 mb-8">
        <Image
          src={logo}
          alt="Logo de MANDE"
          width={160} 
          height={160} 
          className="rounded-full shadow-lg"
        />
      </div>
    </header>
  );
}

export default Header2;
