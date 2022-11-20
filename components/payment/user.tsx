import { useState } from 'react';
import { useForm } from "react-hook-form";

import Slider from 'react-slick';
import Cards from 'react-credit-cards';
import Image from 'next/image';
import PayMethod from '../../domain/user/PayMethod';
import Campus from '../../domain/general/Campus';

type Props = { payMethods: PayMethod[], campuses: Campus[] };

const PaymentForm = ({ payMethods, campuses }: Props) => {

	const [payMethodIndex, setPayMethodIndex] = useState(0);

	const [step, setStep] = useState(0);

	const { register, handleSubmit, formState: { errors, isValid } } = useForm();

	const onSubmit = (data: any) => {
		console.log(data);
	};

	const handleCardSelect = (index: number) => {
		setPayMethodIndex(index);
	};

	const StepCard = () => (
		<div className='flex'>
			<div style={{ width: '300px', maxWidth: '100%' }} className='my-auto'>
				<h3 className='font-bold text-center mb-6'>Seleccione su método de pago:</h3>
				<Slider dots afterChange={handleCardSelect}>
					{
						payMethods.map((payMethod : PayMethod) => (
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

	const StepForm = () => (
		<div className='flex flex-col gap-6'>
			<div className='flex'>
				<div className='my-auto'>
					<label className='block text-sm font-medium text-gray-700'>Campus</label>
					<select {...register('campus', { required: true })}>
						{
							campuses.map((campus) => (
								<option key={campus.id} value={campus.id}>{campus.campus}</option>
							))
						}
					</select>
				</div>
			</div>
			<div className='grid grid-cols-2 grid-rows-1 gap-8'>
				<div>
					<label className='block text-sm font-medium text-gray-700'>CVV</label>
					<input
						{...register('cvv', { required: true })}
						className={`${errors.cvv && 'border border-red-400 !important'} w-12`}
						type='password'
						maxLength={3}
					/>
					{errors.cvv && <span>mandatory</span>}
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700'>Expiration date</label>
					<div className='flex'>
						<input
							{...register('exp_month', { required: true })}
							className={`${errors.exp_month && 'border border-red-400 !important'} w-10`}
							type='password'
							placeholder='mm'
							maxLength={2}
						/>
						/
						<input
							{...register('exp_year', { required: true })}
							className={`${errors.exp_month && 'border border-red-400 !important'} w-14`}
							type='password'
							placeholder='yyyy'
							maxLength={4}
						/>
					</div>
					{(errors.exp_month || errors.exp_year) && <span>mandatory</span>}
				</div>
			</div>
		</div>
	);

	const formSteps: any = [<StepCard />, <StepForm />];

	const Navigation = () => (
		<section className='w-full justify-between mt-8 flex flex-row-reverse'>
			{
				step === formSteps.length - 1 &&
				<button type="submit"
				className='py-3 px-5 bg-blue-700 text-blue-100 rounded text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed'
				disabled={!isValid}>
					FINALIZAR
				</button>
			}
			{
				step < formSteps.length - 1 &&
				<button
					type="button"
					className='flex flex-row items-center text-xs font-bold bg-blue-100 rounded py-2 px-3 text-blue-600 flex-row-reverse disabled:opacity-40 disabled:cursor-not-allowed'
					disabled={!isValid} onClick={() => { setStep(step + 1) }}
				>
					&rarr;
					SIGUIENTE
				</button>
			}
			{
				step > 0 &&
				<button
					type="button"
					className='flex flex-row items-center text-xs font-bold bg-gray-100 text-gray-400 rounded py-2 px-3'
					onClick={() => { setStep(step - 1) }}
				>
					&larr;
					ATRÁS
				</button>
			}
		</section>
	);

	const Reference = () =>(
    <footer className={'w-full flex items-center justify-center gap-1 py-4'}>
      {formSteps.map((step: any, i: number) => (
				<span className={step >= i ? 'rounded-full w-2 h-2 bg-blue-600' : 'rounded-full w-2 h-2 bg-gray-300'} />
			))}
    </footer>
  )

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='bg-white p-8 shadow-sm flex flex-col justify-center'>
			{formSteps[step]}
			<Navigation/>
			<Reference/>
		</form>
	);
}

export default PaymentForm;
