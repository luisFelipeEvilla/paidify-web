import { useEffect, useState } from "react";
import Campus from "../../../domain/general/Campus";

type Props = {
	campuses: Campus[], register: Function, errors: any, cardIsCredit: boolean, resetField: Function,
	enableInstallments: boolean, setEnableInstallments: Function, unregister: Function
};

const StepForm = (props: Props) => {
	const { campuses, register, errors, cardIsCredit, resetField, enableInstallments, 
		setEnableInstallments, unregister } = props;

	const handleInstallmentsChange = (e: any) => {
		setEnableInstallments(e.target.checked);
	};

	useEffect(() => {
		if(!cardIsCredit) setEnableInstallments(false);
	}, [cardIsCredit]);
	
	useEffect(() => {
		if(!enableInstallments) resetField('num_installments');
		unregister('num_installments');
		register('num_installments', { required: enableInstallments });
	}, [enableInstallments]);
	
	return (
		<div className='flex flex-col gap-6'>
			<div className='flex'>
				<div className='my-auto'>
					<label className='block text-lg font-medium text-gray-700'>Campus</label>
					<select {...register('campus', { required: true })}>
						{
							campuses.map((campus) => (
								<option key={campus.id} value={campus.id}>{campus.campus}</option>
							))
						}
					</select>
				</div>
			</div>
			
			<div className='flex'>
				<div className='my-auto'>
					<div className="flex gap-2">
						<input
							type='checkbox'
							disabled={!cardIsCredit}
							// checked={cardIsCredit && enableInstallments}
							checked={enableInstallments}
							onChange={handleInstallmentsChange}
						/>
						<label
							className='block text-lg font-medium text-gray-700'
							onClick={() => handleInstallmentsChange({ target: { checked: !enableInstallments } })}
						>Cuotas mensuales</label>
					</div>
					<div className="ml-2">
						<input
							disabled={!enableInstallments}
							type='number'
							min={2}
							max={12}
							{...register('num_installments', { required: enableInstallments })}
							className='py-1 px-2 w-48'
							placeholder={enableInstallments ? 'Número de cuotas' : ''}
						/>
					</div>
				</div>
			</div>
			
			<div className='grid grid-cols-2 grid-rows-1 gap-8'>
				<div>
					<label className='block text-lg font-medium text-gray-700'>CVV</label>
					<input
						{...register('cvv', { required: true })}
						className={`${errors.cvv && 'border border-red-400 !important'} w-16 py-1 px-2`}
						type='password'
						placeholder='cvv'
						maxLength={3}
					/>
					{/* {errors.cvv && <span>mandatory</span>} */}
				</div>
				<div>
					<label className='block text-lg font-medium text-gray-700'>Fecha de expiración</label>
					<div className='flex items-center gap-1'>
						<input
							{...register('exp_month', { required: true })}
							className={`${errors.exp_month && 'border border-red-400 !important'} w-12 py-1 px-2`}
							type='password'
							placeholder='mm'
							maxLength={2}
						/>
						<span className="text-2xl">/</span>
						<input
							{...register('exp_year', { required: true })}
							className={`${errors.exp_month && 'border border-red-400 !important'} w-14 py-1 px-2`}
							type='password'
							placeholder='yyyy'
							maxLength={4}
						/>
					</div>
					{/* {(errors.exp_month || errors.exp_year) && <span>mandatory</span>} */}
				</div>
			</div>
		</div>
	);
};

export default StepForm;
