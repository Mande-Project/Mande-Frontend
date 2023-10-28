import '@radix-ui/themes/styles.css';
import Head from "next/head";
import React from 'react';
import Layout from "../components/Layout";
import '../css/spinner.css';
import './index.css';

// eslint-disable-next-line react/prop-types
const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>MANDE</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp;