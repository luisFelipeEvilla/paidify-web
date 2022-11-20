import Head from 'next/head';
import { useState } from 'react';
import Router from 'next/router';

// third party libraries
import Cards from 'react-credit-cards';
import jwt from 'jsonwebtoken';
import Slider from 'react-slick';
import Cookies from 'cookies';

// css for carrousels
import 'react-credit-cards/es/styles-compiled.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// config vars
import { API_URL } from '../../../config';

// components
import Header from '../../../components/headers/user';

import { ACCESS_TOKEN, ROLE_ADMIN } from '../../../utils/constants';
import PayMethod from '../../../domain/user/PayMethod';

const PaymentMethods = ({ data }: { data: PayMethod[] }) => {
	const [cards, setCards] = useState(data);

	const redirect = () => {
		Router.push('/payment-methods/add');
	}

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	return (
		<>
			<Head>
				<title>Payment Methods</title>
			</Head>
			<Header />
			<main className=''>

				<div style={{ height: '80vh' }} className='flex'>

					<div style={{ width: '330px', maxWidth: '65%' }} className='m-auto text-right'>
						<div className=''>
							<button onClick={redirect} className='mb-4 mr-2.5 hover:scale-105 text-2xl bg-green-500 text-white rounded-full w-11 h-11'>
								+
							</button>
						</div>
						<Slider {...settings}>
							{
								cards.map((card) => (
									<div className='div' key={card.id}>
										<Cards
											number={card.card_number + ''}
											name={card.owner}
											expiry={'**/**'}
											cvc={'***'}
										/>
									</div>
								))
							}
						</Slider>
					</div>
				</div>

			</main>
		</>
	)
}

export async function getServerSideProps({ req, res }: any) {
	const cookies = new Cookies(req, res);

	const token = cookies.get(ACCESS_TOKEN) as string;

	if (!token) {
		return {
			redirect: {
				destination: '/guest',
				permanent: true,
			}
		}
	}

	const user = jwt.decode(token) as { id: number, role: number };

	if (!user) {
		return {
			redirect: {
				destination: '/guest',
				permanent: true,
			}
		}
	}

	if (user.role === ROLE_ADMIN) {
		return {
			redirect: {
				destination: '/admin',
				permanent: true,
			}
		}
	}

	let response;

	try {
		response = await fetch(`${API_URL}/users/${user.id}/pay-methods`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});
	} catch (error) {
		return {
			props: { data: {} }
		};
	}

	let data: PayMethod;

	if (response.status === 200) {
		data = await response.json();
	} else {
		return {
			props: { data: {} }
		};
	}

	return { props: { data } };
}

export default PaymentMethods;
