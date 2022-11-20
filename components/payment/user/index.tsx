import { useState } from 'react';
import { useForm } from "react-hook-form";

import StepCard from './stepCard';
import StepForm from './stepForm';
import PayMethod from '../../../domain/user/PayMethod';
import Campus from '../../../domain/general/Campus';
import StepConfirm from './stepConfirm';
import { CARD_TYPE_CREDIT } from '../../../utils/constants';
import FinishButton from '../../buttons/finish';
import NextButton from '../../buttons/next';
import BackButton from '../../buttons/back';

type Props = { payMethods: PayMethod[], campuses: Campus[] };

const PaymentForm = ({ payMethods, campuses }: Props) => {
	// console.log(payMethods.map(payMethod => payMethod.card_type));
	
	const [payMethodIndex, setPayMethodIndex] = useState(0);
	const [enableInstallments, setEnableInstallments] = useState(false);

	const [step, setStep] = useState(0);

	const { register, handleSubmit, resetField, unregister, formState: { errors, isValid } } = useForm();

	const onSubmit = (data: any) => {
		console.log(data);
	};

	const cardIsCredit = () => {
		// console.log('cardIsCredit?', payMethods[payMethodIndex].card_type);
		
		return payMethods[payMethodIndex].card_type === CARD_TYPE_CREDIT;
	}

	const formSteps: any = [
		<StepCard payMethods={payMethods} setPayMethodIndex={setPayMethodIndex} payMethodIndex={payMethodIndex}/>,
		<StepForm
			campuses={campuses}
			errors={errors}
			register={register}
			unregister={unregister}
			cardIsCredit={cardIsCredit()}
			resetField={resetField}
			enableInstallments={enableInstallments}
			setEnableInstallments={setEnableInstallments}
		/>,
		<StepConfirm/>
	];

	const Navigation = () => (
		<section className='w-full justify-between mt-8 flex flex-row-reverse'>
			{
				step === formSteps.length - 1 &&
				<FinishButton disabled={!isValid}/>
			}
			{
				step < formSteps.length - 1 &&
				<NextButton onClick={() => { setStep(step + 1) }}/>
			}
			{
				step > 0 &&
				<BackButton onClick={() => { setStep(step - 1) }}/>
			}
		</section>
	);

	const Reference = () => (
		<footer className={'w-full flex items-center justify-center gap-1 py-4'}>
			{formSteps.map((_: any, i: number) => (
				<span key={i} className={step >= i ? 'rounded-full w-2 h-2 bg-blue-600' : 'rounded-full w-2 h-2 bg-gray-300'} />
			))}
		</footer>
	)

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='bg-white p-8 shadow-sm flex flex-col justify-center'>
			{formSteps[step]}
			<Navigation />
			<Reference />
		</form>
	);
}

export default PaymentForm;
