import Head from 'next/head';
import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';

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
import { API_URL } from '../../config';
import { ACCESS_TOKEN, ROLE_ADMIN } from '../../utils/constants';

// components
import Header from '../../components/headers/user';
import ReactModal from 'react-modal';
import PayMethodForm from '../../components/forms/addPayMethod';

import PayMethod from '../../domain/user/PayMethod';
import { useCookies } from 'react-cookie';

type Props = {
	data: PayMethod[]
}

const PaymentMethods = ({ data }: Props) => {

	const [cards, setCards] = useState(data);
	const [showModal, setShowModal] = useState(false);
	const [loadCards, setLoadCards] = useState(false);
	const [cardIndex, setCardIndex] = useState(0);
	const [errMsg, setErrMsg] = useState('');

	const [cookies] = useCookies([ACCESS_TOKEN]);
	const router = useRouter();

	const closeModal = () => setShowModal(false);

	const openModal = () => setShowModal(true);

	const handleCardSelect = (index: number) => {
		setCardIndex(index);
	};

	const showErrMesg = (msg: string) => {
		setErrMsg(msg);
		setTimeout(() => {
			setErrMsg('');
		}, 3000);
	}

	const deleteCard = async () => {
		const token = cookies[ACCESS_TOKEN];

		if (!token) return await router.replace('/signin');

		const user = jwt.decode(token) as { id: number, role: number };

		if (!user) return await router.replace('/signin');

		let response;
		try {
			response = await fetch(`${API_URL}/users/${user.id}/pay-methods/${cards[cardIndex].id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${cookies[ACCESS_TOKEN]}`
				}
			});
		} catch (err) {
			console.log(err);
		}

		if (!response) return showErrMesg('Error al agregar la tarjeta');

		if (response.status === 200) {
			setLoadCards(true);
		} else {
			showErrMesg('Error al eliminar la tarjeta');
		}
	}

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

	useEffect(() => {
		setLoadCards(false);

		if (loadCards) {
			const token = cookies[ACCESS_TOKEN];

			if (token) {
				const user = jwt.decode(token) as { id: number };

				if (user) {
					fetch(`${API_URL}/users/${user.id}/pay-methods`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						}
					})
						.then(res => res.json())
						.then(data => {
							setCards(data);
						})
						.catch(err => router.reload());
				}
			} else {
				router.replace('/signin');
			}
		}
	}, [loadCards]);

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

							{errMsg && <p className='text-red-500 text-center'>{errMsg}</p>}

							<button
								className='mb-4 mr-2.5 hover:scale-105 text-2xl bg-red-500 text-white rounded-full w-11 h-11'
								onClick={deleteCard}
							>
								-
							</button>
							
							<button
								className='mb-4 mr-2.5 hover:scale-105 text-2xl bg-green-500 text-white rounded-full w-11 h-11'
								onClick={openModal}
							>
								+
							</button>
							
						</div>
						<Slider {...settings} afterChange={handleCardSelect}>
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

			<ReactModal isOpen={showModal} onRequestClose={closeModal}>
				<PayMethodForm closeModal={closeModal} setLoadCards={setLoadCards} />
			</ReactModal>
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
