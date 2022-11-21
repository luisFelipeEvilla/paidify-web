import { useState } from 'react';
import { useForm } from "react-hook-form";

import StepCard from './stepCard';
import StepForm from './stepForm';
import PayMethod from '../../../domain/user/PayMethod';
import Campus from '../../../domain/general/Campus';
import StepConfirm from './stepConfirm';
import { ACCESS_TOKEN, CARD_TYPE_CREDIT } from '../../../utils/constants';
import FinishButton from '../../buttons/finish';
import NextButton from '../../buttons/next';
import BackButton from '../../buttons/back';
import { API_URL } from '../../../config';
import { useCookies } from 'react-cookie';

type Props = {
	payMethods: PayMethod[],
	campuses: Campus[],
	payConceptId: number | undefined,
	payConceptPersonId: number | undefined,
	setWaitingPayment: (waitingPayment: boolean) => void,
	setRefNumber: (refNumber: string) => void
};

// type submitData = {
// 	campus: string,
// 	num_installments: number | undefined,
// 	cvv: string,
// 	exp_month: string,
// 	exp_year: string
// };

const PaymentForm = ({ payMethods, campuses, payConceptId, payConceptPersonId, setRefNumber, setWaitingPayment }: Props) => {

	const [cookies] = useCookies([ACCESS_TOKEN]);
	
	const [payMethodIndex, setPayMethodIndex] = useState(0);
	const [enableInstallments, setEnableInstallments] = useState(false);
	const [step, setStep] = useState(0);

	const {
		register, unregister, handleSubmit, resetField, watch, formState: { errors, isValid }
	} = useForm();

	const onSubmit = ({ campus, cvv, exp_month, exp_year, num_installments }: any) => {
		console.log(campus);
		console.log(watch('campus'));

		const body: any = {
			cvv, exp_month, exp_year,
			campus_id: +campus,
			num_installments: num_installments || 1,
			date: new Date().toISOString(),
			payment_concept_id: payConceptId,
			payment_concept_person_id: payConceptPersonId,
			payment_method_id: payMethods[payMethodIndex].id
		};
		console.log(body);

		fetch(API_URL + '/pay', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + cookies[ACCESS_TOKEN]
			},
			body: JSON.stringify(body)
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setRefNumber(data.ref_number);
				setWaitingPayment(false);
			})
			.catch(err => {
				console.log(err);
				setWaitingPayment(false);
			});
		
		setWaitingPayment(true);
	};

	const cardIsCredit = () => {
		return payMethods[payMethodIndex].card_type === CARD_TYPE_CREDIT;
	}

	const formSteps: any = [
		<StepCard
			payMethods={payMethods}
			setPayMethodIndex={setPayMethodIndex}
			payMethodIndex={payMethodIndex}
		/>,
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
		<StepConfirm
			campus={campuses.find(({ id }) => id === +watch('campus'))?.campus || ''}
			cardNumber={payMethods[payMethodIndex].card_number}
			numInstallments={enableInstallments ? watch('num_installments') : null}
			cvv={watch('cvv')}
			expMonth={watch('exp_month')}
			expYear={watch('exp_year')}
		/>
	];

	const Navigation = () => (
		<section className='w-full justify-between mt-8 flex flex-row-reverse'>
			{
				step === formSteps.length - 1 &&
				<FinishButton disabled={!isValid} />
			}
			{
				step < formSteps.length - 1 &&
				<NextButton onClick={() => { setStep(step + 1) }} />
			}
			{
				step > 0 &&
				<BackButton onClick={() => { setStep(step - 1) }} />
			}
		</section>
	);

	const Reference = () => (
		<footer className={'w-full flex items-center justify-center gap-1 py-4'}>
			{formSteps.map((_: any, i: number) => (
				<span
					key={i}
					className={step >= i ? 'rounded-full w-2 h-2 bg-blue-600' : 'rounded-full w-2 h-2 bg-gray-300'}
				/>
			))}
		</footer>
	)

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='bg-white p-8 shadow-sm flex flex-col justify-center'
		>
			{formSteps[step]}
			<Navigation />
			<Reference />
		</form>
	);
}

export default PaymentForm;
