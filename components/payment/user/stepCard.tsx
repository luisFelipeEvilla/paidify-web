import { useState } from 'react';

import Slider from 'react-slick';
import Cards from 'react-credit-cards';
import PayMethod from '../../../domain/user/PayMethod';
import Toggle from 'react-toggle'
import { ACCESS_TOKEN } from '../../../utils/constants';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';
import { API_URL } from '../../../config';
import { useRouter } from 'next/router';
import { withDots } from '../../../utils/general';

type Props = { payMethods: PayMethod[], payMethodIndex: number, setPayMethodIndex: Function };

type Balance = {
	amount: number,
	card_number: string | number,
}

const StepCard = ({ payMethods, setPayMethodIndex, payMethodIndex }: Props) => {

	const [cookies] = useCookies([ACCESS_TOKEN]);
	const router = useRouter();

	const [balances, setBalances]: [Balance[], Function] = useState([]);
	const [toggleChecked, setToggleChecked] = useState(false);
	const [toggleDisabled, setToggleDisabled] = useState(false);

	const handleCardSelect = (index: number) => {
		setPayMethodIndex(index);
	};

	const handleToggleChange = async (e: any) => {
		setToggleChecked(e.target.checked);

		if (e.target.checked) {
			setToggleDisabled(true);
			// call api
			const token = cookies[ACCESS_TOKEN];

			if (!token) return await router.replace('/signin');

			let response;

			console.log({
				'card_numbers': payMethods.map((payMethod: PayMethod) => payMethod.card_number)
			});
			
			try {
				response = await fetch(`${API_URL}/check-balance`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${cookies[ACCESS_TOKEN]}`
					},
					body: JSON.stringify({
						'card_numbers': payMethods.map((payMethod: PayMethod) => payMethod.card_number)
					}),
				})
			} catch (err) {
				console.log(err);
				// return setToggleDisabled(false);
			}

			if(!response || response.status !== 200) return setToggleDisabled(false);

			const data = await response.json();
			setBalances(data);
			setToggleDisabled(false);
		}
	}

	const getBalanceCurrentPayMeth = () => {
		if(!toggleChecked) {
			return 'Consulta de saldos deshabilitada';
		} else {
			if(toggleDisabled) {
				return 'Consultando saldos...';
			} else {
				const currentPayMethod = payMethods[payMethodIndex];
				console.log(balances);
				
				const balance = balances.find((balance: Balance) => balance.card_number === +currentPayMethod.card_number);
				return balance ? withDots(balance.amount) : 'No se encontró saldo';
			}
		}
		
	}

	return (
		<div>
			<div style={{ width: '300px', maxWidth: '100%' }} className='my-auto border-black'>
				<label className='block text-lg font-medium text-gray-800 text-center mb-6'>
					Seleccione su método de pago
				</label>
				<Slider dots afterChange={handleCardSelect} initialSlide={payMethodIndex}>
					{
						payMethods.map((payMethod: PayMethod) => (
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
			<div className='flex flex-col p-2 text-sm font-bold text-gray-500 hover:text-gray-700 mt-3'>
				<div className='flex justify-center'>
					<input
						type='text'
						readOnly
						value={getBalanceCurrentPayMeth()}
						className='text-center border border-gray-300 mt-4 w-11/12 p-2 rounded-md'
					/>
				</div>
				<div className='flex items-center mt-2'>
					<Toggle
						onChange={handleToggleChange}
						checked={toggleChecked}
						disabled={toggleDisabled}
					/>
					<label className='ml-2'>Verificar saldo</label>
				</div>
			</div>
		</div>
	);
};

export default StepCard;
