import { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import Header from '../../components/headers/user';

import { ACCESS_TOKEN, ROLE_ADMIN } from '../../utils/constants';
import { API_URL } from '../../config';

import jwt from 'jsonwebtoken';
import Cookies from 'cookies';

import 'react-credit-cards/es/styles-compiled.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import PayConcept from '../../domain/general/PayConcept';
import PayConceptPerson from '../../domain/user/PayConceptPerson';
import PayMethod from '../../domain/user/PayMethod';

import PaymentForm from '../../components/payment/user';
import Campus from '../../domain/general/Campus';
import { withDots } from '../../utils/general';
import Link from 'next/link';

import { TailSpin } from 'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

type Props = {
	payConceptPerson: PayConceptPerson | null,
	payConcept: PayConcept | null,
	payMethods: PayMethod[],
	campuses: Campus[]
};

const Payment = ({ payConceptPerson, payConcept, payMethods, campuses }: Props) => {

	const [waitingPayment, setWaitingPayment] = useState(false);
	const [refNumber, setRefNumber] = useState('');

	let concept, ref_number, amount;

	if (payConceptPerson) {
		ref_number = payConceptPerson.ref_number;
		concept = payConceptPerson.payment_concept.payment_concept;
		amount = payConceptPerson.payment_concept.amount;
	} else if (payConcept) {
		concept = payConcept.payment_concept;
		amount = payConcept.amount;
	} else {
		return <div></div>;
	}

	const Form = () => (
		<PaymentForm
			payMethods={payMethods}
			campuses={campuses}
			payConceptPersonId={payConceptPerson ? payConceptPerson.id : undefined}
			payConceptId={payConcept ? payConcept.id : payConceptPerson ? payConceptPerson.payment_concept.id : undefined}
			setWaitingPayment={setWaitingPayment}
			setRefNumber={setRefNumber}
		/>
	);

	return (
		<>
			<Head>
				<title>Resumen de Compra</title>
			</Head>
			<Header />
			<main>
				<div className='flex m-auto w-fit' style={{ height: '80vh' }}>
					{!waitingPayment ?
						<>
							{!refNumber ?
								<>
									<div className='m-auto grid grid-cols-2 justify-items-center'>
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
										{payMethods.length ?
											<Form />
											:
											<div className='my-auto'>
												<label className='block text-lg font-medium text-gray-700 text-center mb-4'>
													No tiene métodos de pago registrados
												</label>
												<div className='flex justify-center'>
													<Link href='/user/payment-methods'>
														<a className='text-center text-lg font-medium text-blue-600 hover:text-blue-500'>
															Registrar método de pago
														</a>
													</Link>
												</div>
											</div>
										}
									</div>
								</>
								:
								<div className='m-auto'>
									<div className='py-14 px-10 shadow-md flex justify-center items-center border-gray-300 border flex-col rounded-lg max-w-2xl'>
										<div>
											<Image src='/icons/order_icon.png' width={150} height={150} />
										</div>
										<h3 className='font-bold mb-6'>Pago en proceso</h3>
										<div className='text-gray-800 text-center'>
											<p><b>Referencia de Pago:</b> {refNumber}</p>
											<p><b>Descripción:</b> {concept}</p>
											<p className='mt-2'>Tu solicitud de pago está siendo procesada. No olvides revisar tu correo para seguir el estado de la transacción.</p>
										</div>
									</div>
								</div>
							}
						</>
						:
						<div className='my-auto'>
							<TailSpin
								height="160"
								width="160"
								color="#3B82F6"
								ariaLabel="tail-spin-loading"
								radius="1"
								wrapperStyle={{}}
								wrapperClass=""
								visible={true}
							/>
						</div>
					}

				</div>
			</main>
		</>
	)
}

export async function getServerSideProps({ req, res, query }: any) {

	const { pcpid, pcid } = query;

	if (!pcpid && !pcid || pcpid && pcid) { // if none or if both are present
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
		pcpid ?
			fetch(`${API_URL}/users/${user.id}/pay-concept-persons/${pcpid}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				}
			})
			:
			fetch(`${API_URL}/pay-concepts/${pcid}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			})
		,
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
		const [payConceptRes, payMethodsRes, campusesRes] = await Promise.all(promises);
		if (payConceptRes.status !== 200 || payMethodsRes.status !== 200 || campusesRes.status !== 200) {
			return {
				redirect: {
					destination: '/user',
					permanent: true,
				}
			};
		}

		const payConcept = await payConceptRes.json();
		const payMethods = await payMethodsRes.json();
		const campuses = await campusesRes.json();

		return {
			props: {
				payConceptPerson: pcpid ? payConcept : null,
				payConcept: pcid ? payConcept : null,
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
