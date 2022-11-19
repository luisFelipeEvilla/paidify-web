import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Paidify</title>
        <meta name="description" content="Created by Luis Felipe Evilla Rodriguez" />
        <link rel="apple-touch-icon" sizes="180x180" href="logo/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="loog/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="logo/favicon-16x16.png" />
        <link rel="manifest" href="logo/site.webmanifest" />
      </Head>
      <Component {...pageProps} />)
    </>
  )
}

export default MyApp
