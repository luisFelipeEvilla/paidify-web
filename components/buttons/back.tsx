type Props = {
	onClick: () => void,
	children: React.ReactNode
}

const BackButton = ({ onClick, children }: Props) => {
	return (
		<button
			type="button"
			className='flex flex-row items-center text-xs font-bold bg-gray-100 text-gray-400 rounded py-2 px-3'
			onClick={onClick}
		>
			{children}
		</button>
	);
}

BackButton.defaultProps = {
	onClick: () => { },
	children:
		<>
			&larr;
			ATRÁS
		</>
}

export default BackButton;
