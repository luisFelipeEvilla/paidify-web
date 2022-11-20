import '../styles/globals.css'
import type { AppProps } from 'next/app'

import AuthProvider from '../components/appState';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {

  const [showChild, setShowChild] = useState(false);

  useEffect(() => setShowChild(true), []);

  if (!showChild) return null; //IMPORTANT: show child after first render, otherwise you will get an error

  return <AuthProvider><Component {...pageProps} /></AuthProvider>
}

export default MyApp
