import Slider from 'react-slick';
import Cards from 'react-credit-cards';
import PayMethod from '../../../domain/user/PayMethod';

type Props = { payMethods: PayMethod[], payMethodIndex: number, setPayMethodIndex: Function };

const StepCard = ({ payMethods, setPayMethodIndex, payMethodIndex }: Props) => {
	
	const handleCardSelect = (index: number) => {
		setPayMethodIndex(index);
	};
	
	return (
		<div className='relative'>
			{/* <button
				className='bg-green-500 text-white rounded-full absolute top-10 -right-12 z-50 p-1 font-bold text-xl shadow-lg hover:scale-105 hover:bg-green-400 transition-all duration-300 aspect-square w-9 h-9'
			>$</button> */}
			<div style={{ width: '300px', maxWidth: '100%' }} className='my-auto'>
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
		</div>
	);
};

export default StepCard;
