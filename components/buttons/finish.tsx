type Props = {
	disabled: boolean,
	onClick: () => void,
	children: React.ReactNode
}

const FinishButton = ({ disabled, onClick, children }: Props) => {
	return (
		<button
			type='submit'
			className='py-3 px-5 bg-blue-500 text-blue-100 rounded text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed'
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

FinishButton.defaultProps = {
	disabled: false,
	onClick: () => {},
	children: <>FINALIZAR</>
}

export default FinishButton;
