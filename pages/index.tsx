import Head from 'next/head'
import Header from '../components/header';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Invoice from '../components/invoice';
import SearchBar from '../components/searchBar';
import { useState } from 'react';
import Cookies from 'cookies';
import jwt from 'jsonwebtoken';
import { API_URL } from '../config';

type invoice = { concept: string; paymentDate: string; invoiceNumber: number; amount: number; };
type invoices = { data: invoice[] };

const Home = ({ data } : invoices) => {
  const [invoices, setInvoices] = useState(data);
  
  console.log(invoices);
  
  function handleChange (search: any) {
    setInvoices(
      data.filter((invoice: any) => {
        return invoice.concept.toLowerCase().includes(search.toLowerCase());
      })
    );
  };

  return (
    <div>
      <Head>
        <title>Paidify</title>
        <meta name="description" content="Created by Luis Felipe Evilla Rodriguez" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header></Header>
        <div className={styles.hero + " mt-8 "}>
          <Image src="/images/hero.png" width={620} height={310} />
        </div>

        <div className="flex">
          <div className="m-auto">
            <SearchBar
              handleChange={handleChange}
            ></SearchBar>
          </div>
        </div>
        {
          invoices.map((invoice) => (
            <Invoice
              concept={invoice.concept}
              paymentDate={invoice.paymentDate}
              invoiceNumber={invoice.invoiceNumber}
              amount={invoice.amount} />
          ))
        }
      </main>

      <footer>
      </footer>
    </div>
  )
};

export async function getServerSideProps({req, res} : any) {
  const cookies = new Cookies(req, res);

  const token = cookies.get('token') as string;
  
  const user = jwt.decode(token) as { id: number };
  
  const url = `${API_URL}/users/${user?.id}/invoices`;
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  
  const data = await response.json(); 
  
  return {
    props: {data}
  }
}

export default Home
