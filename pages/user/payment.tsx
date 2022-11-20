import Head from 'next/head';
import Image from 'next/image';
import Header from '../../components/headers/user';

import { ACCESS_TOKEN, ROLE_ADMIN } from '../../utils/constants';
import { API_URL } from '../../config';
import { useEffect, useState } from 'react';

import Cards from 'react-credit-cards';
import jwt from 'jsonwebtoken';
import Slider from 'react-slick';
import Cookies from 'cookies';

import 'react-credit-cards/es/styles-compiled.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import PayConceptPerson from '../../domain/user/PayConceptPerson';
import PayMethod from '../../domain/user/PayMethod';

const Payment = ({ payConceptPerson, payMethods }: { payConceptPerson: PayConceptPerson, payMethods: PayMethod[] }) => {
	const { payment_concept, ref_number } = payConceptPerson;
	const { amount, payment_concept: concept } = payment_concept;
	const [payMethod, setPayMethod] = useState(payMethods[0]);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	useEffect(() => {
		console.log(payMethod);
	}, [payMethod]);

	return (
		<>
			<Head>
				<title>Resumen de Compra</title>
			</Head>
			<Header />
			<main>
				<div className='flex m-auto w-fit' style={{ height: '80vh' }}>
					<div className='m-auto grid grid-cols-2  justify-items-center'>
						
						<div className='flex'>
							<div style={{ width: '300px', maxWidth: '100%' }} className='my-auto'>
								<h3 className='font-bold text-center mb-6'>Seleccione su método de pago:</h3>
								
								<Slider {...settings}>
									{
										payMethods.map((payMethod) => (
											<div className='div' key={payMethod.id}>
												<Cards
													number={payMethod.card_number + ''}
													name={payMethod.owner}
													expiry={'**/**'}
													cvc={'***'}
												/>
											</div>
										))
									}
								</Slider>

							</div>
						</div>

						<div className='py-14 px-10 shadow-md flex justify-center items-center border-gray-300 border flex-col rounded-lg'>

							<div>
								<Image src='/icons/order_icon.png' width={150} height={150} />
							</div>

							<h3 className='font-bold mb-6'>Resumen de compra</h3>

							<div className='text-gray-800'>
								<p><b>Referencia:</b> {ref_number}</p>
								<p><b>Descripción:</b> {concept}</p>
								<p><b>Total a pagar:</b> COP {amount}</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}

export async function getServerSideProps({ req, res, query }: any) {
	if (!query.pcpid) {
		return {
			redirect: {
				destination: '/',
				permanent: true,
			}
		};
	}

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
		response = await fetch(`${API_URL}/users/${user.id}/pay-concept-persons/${query.pcpid}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});
	} catch (error) {
		return {
			props: {}
		};
	}

	let props: { payConceptPerson: PayConceptPerson, payMethods: PayMethod[] } = {} as any;

	if (response.status === 200) {
		props.payConceptPerson = await response.json();
	} else {
		return { props };
	}

	try {
		response = await fetch(`${API_URL}/users/${user.id}/pay-methods/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});
	} catch (error) {
		return { props };
	}

	if (response.status === 200) {
		props.payMethods = await response.json();
	} else {
		return { props };
	}

	return { props };
}

export default Payment;
