import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Invoice Table</title>
        <meta name='description' content='Invoice Table' />
        <meta property='og:title' content='Invoice Table' />
        <meta property='og:description' content='Invoice Table' />
        <meta charSet="utf-8" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
