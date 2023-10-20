import Head from "next/head";
import Layout from "../components/Layout";
import './index.css';

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