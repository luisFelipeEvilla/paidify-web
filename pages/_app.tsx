import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { useCookies } from 'react-cookie';
import { useRouter } from "next/router";
import Index from "./index";
import { ACCESS_TOKEN, ROLE_ADMIN, ROLE_GUEST, ROLE_USER } from '../utils/constants';

import jwt from 'jsonwebtoken';
import AuthProvider from '../components/appState';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {

  console.log('_app');
  
  
  const [showChild, setShowChild] = useState(false);
  const [cookies, _, removeCookie] = useCookies([ACCESS_TOKEN]);
  const router = useRouter();

  useEffect(() => setShowChild(true), []);

  if (!showChild) return null; //IMPORTANT: show child after first render, otherwise you will get an error

  // if (typeof window === 'undefined') return <></>; //not sure if this is needed, but i leave it here just in case

  // let allowed = true;

  // const token = cookies[ACCESS_TOKEN] as string;

  // if (token) {
  //   const decoded = jwt.decode(token) as { role: number };
    
  //   if (decoded) {
  //     const { role } = decoded;

  //     // switch (role) {
  //     //   case ROLE_ADMIN:
  //     //     allowed = router.pathname.startsWith('/admin');
  //     //     break;
  //     //   case ROLE_USER:
  //     //     allowed = router.pathname.startsWith('/user');
  //     //     break;
  //     //   case ROLE_GUEST:
  //     //     allowed = router.pathname.startsWith('/guest') || router.pathname === '/signin';
  //     //     break;
  //     //   default:
  //     //     allowed = false;
  //     // }

  //     if (router.pathname.startsWith('/admin') && role !== ROLE_ADMIN) {
  //       allowed = false;
  //     } else if (router.pathname.startsWith('/user') && role !== ROLE_USER) {
  //       allowed = false;
  //     } else if (router.pathname.startsWith('/guest') && role !== ROLE_GUEST) {
  //       allowed = false;
  //     }
      
  //   } else {
  //     if(router.pathname.startsWith('/admin') || router.pathname.startsWith('/user')) {
  //       allowed = false;
  //     }
  //     removeCookie(ACCESS_TOKEN);
  //   }
  // } else {
  //   if(router.pathname.startsWith('/admin') || router.pathname.startsWith('/user')) {
  //   // if(!router.pathname.startsWith('/guest')) {
  //     allowed = false;
  //   }
  // }

  // const ComponentToRender = allowed ? Component : Index; 
  // return <AuthProvider><ComponentToRender {...pageProps} /></AuthProvider>
  return <AuthProvider><Component {...pageProps} /></AuthProvider>
}

export default MyApp
