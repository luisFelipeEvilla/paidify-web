import { useState } from 'react';
import Head from 'next/head'

import { API_URL } from '../../config';

import Header from '../../components/headers/guest';
import Hero from '../../components/hero';
import InfoCard from '../../components/infoCards/payConcept';
import SearchBar from '../../components/searchBar';

import PayConcept from '../../domain/general/PayConcept';
import Cookies from 'cookies';
import { ACCESS_TOKEN, ROLE_ADMIN, ROLE_USER } from '../../utils/constants';

import jwt from 'jsonwebtoken';

const Home = ({ data }: { data: PayConcept[] }) => {

  const [payConcepts, setPayConcepts] = useState(data);

  function handleChange(search: any) {
    setPayConcepts(
      data.filter((payConcept: PayConcept) => {
        return payConcept.payment_concept.toLowerCase().includes(search.toLowerCase());
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
        <Header />
        <Hero />
        <div className="flex">
          <div className="m-auto">
            <SearchBar
              handleChange={handleChange}
            ></SearchBar>
          </div>
        </div>
        {
          payConcepts.map((payConcept : PayConcept) => (
            <InfoCard
              key={payConcept.id}
              id={payConcept.id}
              payment_concept={payConcept.payment_concept}
              amount={payConcept.amount}
            />
          ))
        }
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

    if(user) {
      if(user) {
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
  
  let response;

  try {
    response = await fetch(API_URL + '/pay-concepts', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return {
      props: { data: [] }
    };
  }
  
  let data;

  if (response.status === 200) {
    data = await response.json();
  } else {
    return {
      props: { data: [] }
    };
  }
  
  // console.log(data);

  return {
    props: { data }
  };
}

export default Home;
