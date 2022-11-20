type Props = {
	disabled: boolean,
	onClick: () => void,
	children: React.ReactNode
}

const NextButton = ({ disabled, onClick, children }: Props) => {
	return (
		<button
			type="button"
			className='flex items-center text-xs font-bold bg-blue-100 rounded py-2 px-3 text-blue-600 flex-row-reverse disabled:opacity-40 disabled:cursor-not-allowed'
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

NextButton.defaultProps = {
	disabled: false,
	onClick: () => { },
	children:
		<>
			&rarr;
			SIGUIENTE
		</>
}

export default NextButton;
