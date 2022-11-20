import Head from 'next/head';
import Header from '../../components/headers/guest';
import Image from 'next/image';
import Cookies from 'cookies';
import { ACCESS_TOKEN, ROLE_ADMIN, ROLE_USER } from '../../utils/constants';
import jwt from 'jsonwebtoken';
import { API_URL } from '../../config';
import PayConcept from '../../domain/general/PayConcept';
import { useEffect, useState } from 'react';
import { withDots } from '../../utils/general';

const Payment = ({ data }: { data: PayConcept }) => {
	const { payment_concept, amount } = data;
	const [payMeth, setPayMeth] = useState('');

	useEffect(() => {
		console.log(payMeth);
	}, [payMeth]);

	return (
		<>
			<Head>
				<title>Resumen de Compra</title>
			</Head>
			<Header />
			<main>
				<div className='flex m-auto w-fit' style={{ height: '80vh' }}>
					<div className='m-auto grid grid-cols-2  justify-items-center'>
						<div className='my-auto'>
							<h3 className='font-bold'>Seleccione la forma de pago:</h3>

							<div
								className={`shadow-md border-gray-300 border p-4 mx-auto my-4 flex rounded-lg cursor-pointer hover:scale-105 ease-out duration-100 ${payMeth === 'credit' ? 'bg-blue-200' : ''}`}
								onClick={() => setPayMeth('credit')}
							>
								<div className='mr-4'>
									<Image src='/icons/icons8-tarjetas-bancarias-64.png' width={64} height={64} />
								</div>
								<p className='m-auto'>Tarjeta de crédito</p>
							</div>

							<div
								className={`shadow-md border-gray-300 border p-4 mx-auto my-4 flex rounded-lg cursor-pointer hover:scale-105 ease-out duration-100 ${payMeth === 'debit' ? 'bg-blue-200' : ''}`}
								onClick={() => setPayMeth('debit')}
							>
								<div className='mr-4'>
									<Image src='/icons/pse.png' width={64} height={64} />
								</div>
								<p className='m-auto'>Tarjeta de débito</p>
							</div>

						</div>

						<div className='py-14 px-10 shadow-md flex justify-center items-center border-gray-300 border flex-col rounded-lg'>

							<div>
								<Image src='/icons/order_icon.png' width={150} height={150} />
							</div>

							<h3 className='font-bold mb-6'>Resumen de compra</h3>

							<div className='text-gray-800'>
								{/* <p><b>Referencia:</b> {ref_number}</p> */}
								<p><b>Descripción:</b> {payment_concept}</p>
								<p><b>Total a pagar:</b> COP {withDots(amount)}</p>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}

export async function getServerSideProps({ req, res, query }: any) {
	if (!query.pcid) {
		return {
			redirect: {
				destination: '/',
				permanent: true,
			}
		};
	}

	const cookies = new Cookies(req, res);

	const token = cookies.get(ACCESS_TOKEN) as string;

	if (token) {

		const user = jwt.decode(token) as { id: number, role: number };

		if (user) {
			if (user) {
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
		response = await fetch(`${API_URL}/pay-concepts/${query.pcid}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return {
			props: { data: {} }
		};
	}

	let data: PayConcept;

	if (response.status === 200) {
		data = await response.json();
	} else {
		return {
			props: { data: {} }
		};
	}

	return { props: { data } };
}

export default Payment;
