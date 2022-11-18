import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { useCookies } from 'react-cookie';
import { useRouter } from "next/router";
import Index from "./index";
import { ACCESS_TOKEN, ROLE_ADMIN, ROLE_USER } from '../utils/constants';

import jwt from 'jsonwebtoken';
import AuthProvider from '../components/appState';

function MyApp({ Component, pageProps }: AppProps) {

  const [cookies, _, removeCookie] = useCookies([ACCESS_TOKEN]);
  const router = useRouter();

  let allowed = true;

  const token = cookies[ACCESS_TOKEN] as string;

  if (token) {
    const decoded = jwt.decode(token) as { role: number };
    
    if (decoded) {
      const { role } = decoded;

      if (router.pathname.startsWith('/admin') && role !== ROLE_ADMIN) {
        allowed = false;
      } else if (router.pathname.startsWith('/user') && role !== ROLE_USER) {
        allowed = false;
      }
      
    } else {
      if(router.pathname.startsWith('/admin') || router.pathname.startsWith('/user')) {
        allowed = false;
      }
      removeCookie(ACCESS_TOKEN);
    }
  } else {
    if(router.pathname.startsWith('/admin') || router.pathname.startsWith('/user')) {
      allowed = false;
    }
  }

  const ComponentToRender = allowed ? Component : Index; 
  return <AuthProvider><ComponentToRender {...pageProps} /></AuthProvider>
}

export default MyApp
