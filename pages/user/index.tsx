import { useState } from 'react';
import Head from 'next/head'

import Cookies from 'cookies';
import jwt from 'jsonwebtoken';

import { API_URL } from '../../config';

import Header from '../../components/headers/user';
import Hero from '../../components/hero';
import InfoCard from '../../components/infoCards/payConceptPerson';
import SearchBar from '../../components/searchBar';

import PayConceptPerson from '../../domain/user/PayConceptPerson';

import { ACCESS_TOKEN, ROLE_ADMIN } from '../../utils/constants';

const Home = ({ data }: { data : PayConceptPerson[] }) => {
  
  const [payConceptsPerson, setPayConceptsPerson] = useState(data);

  function handleChange(search: any) {
    setPayConceptsPerson(
      data.filter((payConceptPerson: PayConceptPerson) => {
        return payConceptPerson.payment_concept.payment_concept.toLowerCase().includes(search.toLowerCase());
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
          payConceptsPerson.map((payConceptPerson : PayConceptPerson) => (
            <InfoCard
              key={payConceptPerson.id}
              id={payConceptPerson.id}
              ref_number={payConceptPerson.ref_number}
              payment_concept={payConceptPerson.payment_concept}
              pay_before={payConceptPerson.pay_before}
              completed={payConceptPerson.completed}
            />
          ))
        }
      </main>

      <footer />
    </div>
  )
};

export async function getServerSideProps({ req, res }: any) {
  const cookies = new Cookies(req, res);

  const token = cookies.get(ACCESS_TOKEN) as string;

  if(!token) {
    return {
      redirect: {
        destination: '/guest',
        permanent: true,
      }
    }
  }

  const user = jwt.decode(token) as { id: number, role: number };

  if(!user) {
    return {
      redirect: {
        destination: '/guest',
        permanent: true,
      }
    }
  }

  if(user.role === ROLE_ADMIN) {
    return {
      redirect: {
        destination: '/admin',
        permanent: true,
      }
    }
  }

  let response;

  try {
    // response = await fetch(`${API_URL}/users/${user.id}/pay-concept-persons&completed=0`, {
    response = await fetch(`${API_URL}/users/${user.id}/pay-concept-persons`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    return {
      props: { data: [] }
    };
  }

  let data : PayConceptPerson[];

  if (response.status === 200) {
    data = await response.json();
  } else {
    return {
      props: { data: [] }
    };
  }
  
  return {
    props: { data: data.filter(payConcept => !payConcept.completed) }
  };
}

export default Home;
