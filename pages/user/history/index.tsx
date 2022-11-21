import Cookies from "cookies";
import Head from "next/head";
import { useState } from "react";
import Hero from "../../../components/hero";
import jwt from "jsonwebtoken";
import { API_URL } from "../../../config";
import Header from "../../../components/headers/user";
import Payment from "../../../domain/user/Payment";
import { ACCESS_TOKEN, ROLE_ADMIN } from "../../../utils/constants";
import InfoCard from "../../../components/infoCards/payment";

type Props = { data: Payment[] };

const History = ({ data }: Props) => {
	const [payments, setPayments] = useState(data);
  
	return (
		<div>
			<Head>
				<title>Historial | Paidify</title>
				<meta name="description" content="Created by Luis Felipe Evilla Rodriguez" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Header />
				{/* <Hero /> */}
				{
					payments.map((payment: Payment) => (
						<InfoCard {...payment} />
					))
				}
			</main>

			<footer>
			</footer>
		</div>
	)
}

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
    response = await fetch(`${API_URL}/users/${user.id}/payments?$sort=-date`, {
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

export default History;
