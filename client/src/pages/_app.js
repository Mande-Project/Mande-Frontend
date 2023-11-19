import '@radix-ui/themes/styles.css';
import Head from "next/head";
import React from 'react';
import '../css/spinner.css';
import './index.css';

// eslint-disable-next-line react/prop-types
const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>MANDE</title>
      </Head>
        <Component {...pageProps} />
    </>
  )
}

export default MyApp;