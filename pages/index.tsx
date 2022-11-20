import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { AppState } from '../components/appState';

import Head from 'next/head'
import Header from '../components/headers/general';
import Hero from '../components/hero';

import { ACCESS_TOKEN, ROLE_ADMIN, ROLE_USER } from '../utils/constants';
import Cookies from 'cookies';

import jwt from 'jsonwebtoken';

const Index = () => {
  const { user: { role } }: any = useContext(AppState);
  const router = useRouter();

  // useEffect(() => {
  //   router.replace(role === ROLE_ADMIN ? '/admin' : role === ROLE_USER ? '/user' : '/guest');
  // }, []);

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

export async function getServerSideProps({ req, res }: any) {
  const cookie = new Cookies(req, res);

  const token = cookie.get(ACCESS_TOKEN);

  if (token) {

    const user = jwt.decode(token) as { id: number, role: number };

    if (user) {
      if (user) {
        if (user.role === ROLE_ADMIN) {
          return {
            redirect: {
              destination: '/admin',
              permanent: true,
            }
          }
        }

        if (user.role === ROLE_USER) {
          return {
            redirect: {
              destination: '/user',
              permanent: true,
            }
          }
        }
      }
    }
  }

  return {
    redirect: {
      destination: '/guest',
      permanent: true,
    }
  };
}

export default Index;
