import { useState } from 'react';
import Head from 'next/head'

import Cookies from 'cookies';
import jwt from 'jsonwebtoken';

import { API_URL } from '../config';

import Header from '../components/header';
import Hero from '../components/hero';
import InfoCard from '../components/infoCard';
import SearchBar from '../components/searchBar';

import PayConcept from '../domain/payConcepts';
import payConceptsData from '../repositories/pay-concepts';

type payConcepts = { data: PayConcept[] };

const Home = ({ data } : payConcepts) => {
  const [invoices, setInvoices] = useState(data);
  
  
  function handleChange (search: any) {
    setInvoices(
      data.filter((invoice: PayConcept) => {
        return invoice.payment_concept.toLowerCase().includes(search.toLowerCase());
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
        <Header/>
        <Hero/>
        <div className="flex">
          <div className="m-auto">
            <SearchBar
              handleChange={handleChange}
            ></SearchBar>
          </div>
        </div>
        {
          invoices.map((invoice) => (
            <InfoCard
              key={invoice.id}
              concept={invoice.payment_concept}
              paymentDate={invoice.pay_before}
              invoiceNumber={invoice.ref_number}
              amount={invoice.amount} 
              state={null}
              isConcept={true}
              effectiveDate={null}
              />
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
    props: { data: payConceptsData }
  }
}

export default Home
