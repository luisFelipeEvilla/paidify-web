import Cookies from "cookies";
import Head from "next/head";
import { useState } from "react";
import Header from "../../components/header";
import Hero from "../../components/hero";
import SearchBar from "../../components/searchBar";
import jwt from "jsonwebtoken";
import { API_URL } from "../../config";
import Payment from "../../domain/payments";
import { ACCESS_TOKEN, ROLE_ADMIN } from "../../utils/constants";
import InfoCard from "../../components/infoCards/payment";

const History = ({ data }: { data: Payment[] }) => {
	const [payments, setPayments] = useState(data);

	// function handleChange(search: any) {
	// 	setPayments(
	// 		data.filter((payment: Payment) => {
	// 			return payment.payment_concept.payment_concept.toLowerCase().includes(search.toLowerCase());
	// 		})
	// 	);
	// };

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
						{/* <SearchBar
							handleChange={handleChange}
						></SearchBar> */}
					</div>
				</div>
				{
					payments.map((payment: Payment) => (
						<InfoCard
							
						/>
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
    response = await fetch(`${API_URL}/users/${user.id}/payments`, {
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