import { useState } from 'react';
import Head from 'next/head'

import { API_URL } from '../../config';

import Header from '../../components/header';
import Hero from '../../components/hero';
import InfoCard from '../../components/infoCards/payConcept';
import SearchBar from '../../components/searchBar';

import PayConcept from '../../domain/payConcepts';

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

export async function getServerSideProps() {
  const url = API_URL + '/pay-concepts';

  let response;

  try {
    response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return {
      props: { data: [] }
    }
  }
  
  const status = response.status;

  let data;

  if (status === 200) {
    data = await response.json();
  } else {
    return {
      props: { data: [] }
    }
  }
  
  // console.log(data);

  return {
    props: { data }
  }
}

export default Home;
