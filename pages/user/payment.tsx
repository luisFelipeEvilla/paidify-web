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

import PaymentForm from '../../components/payment/user';
import Campus from '../../domain/general/Campus';
import { withDots } from '../../utils/general';

type Props = { payConceptPerson: PayConceptPerson, payMethods: PayMethod[], campuses: Campus[] };

const Payment = ({ payConceptPerson, payMethods, campuses }: Props) => {
	const { payment_concept, ref_number } = payConceptPerson;
	const { amount, payment_concept: concept } = payment_concept;

	return (
		<>
			<Head>
				<title>Resumen de Compra</title>
			</Head>
			<Header />
			<main>
				<div className='flex m-auto w-fit' style={{ height: '80vh' }}>
					<div className='m-auto grid grid-cols-2  justify-items-center'>
						
						<div className='py-14 px-10 shadow-md flex justify-center items-center border-gray-300 border flex-col rounded-lg'>

							<div>
								<Image src='/icons/order_icon.png' width={150} height={150} />
							</div>

							<h3 className='font-bold mb-6'>Resumen de compra</h3>

							<div className='text-gray-800'>
								<p><b>Referencia:</b> {ref_number}</p>
								<p><b>Descripción:</b> {concept}</p>
								<p><b>Total a pagar:</b> COP {withDots(amount)}</p>
							</div>
						</div>

						<PaymentForm payMethods={payMethods} campuses={campuses}/>
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

	const promises = [
		fetch(`${API_URL}/users/${user.id}/pay-concept-persons/${query.pcpid}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		}),
		fetch(`${API_URL}/users/${user.id}/pay-methods/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		}),
		fetch(`${API_URL}/campuses/`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
	];

	try {
		const [payConceptPersonRes, payMethodsRes, campusesRes] = await Promise.all(promises);
		if(payConceptPersonRes.status !== 200 || payMethodsRes.status !== 200 || campusesRes.status !== 200) {
			return {
				redirect: {
					destination: '/user',
					permanent: true,
				}
			};
		}
		
		const payConceptPerson = await payConceptPersonRes.json();
		const payMethods = await payMethodsRes.json();
		const campuses = await campusesRes.json();

		return {
			props: {
				payConceptPerson,
				payMethods,
				campuses
			}
		};
	} catch (err) {
		console.log(err);
	}

	return {
		redirect: {
			destination: '/',
			permanent: true,
		}
	};
}

export default Payment;
