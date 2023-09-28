import Head from "next/head";

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