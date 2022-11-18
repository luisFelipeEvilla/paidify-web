import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { AppState } from '../components/appState';

import Head from 'next/head'
import Header from '../components/header';
import Hero from '../components/hero';

import { ROLE_ADMIN, ROLE_USER } from '../utils/constants';

const Index = () => { // works as route / and as handler for non allowed routes
  const { user : { role } } : any = useContext(AppState);
  const router = useRouter();

  useEffect(() => {
    router.replace(role === ROLE_ADMIN ? '/admin' : role === ROLE_USER ? '/user' : '/guest');
  }, []);
  
  return (
    <div>
      <Head>
        <title>Paidify</title>
        <meta name="description" content="Created by Luis Felipe Evilla Rodriguez" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <Hero />
      </main>

      <footer />
    </div>
  )
};

export default Index;
