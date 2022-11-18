type primaryButtonProps = { callback: any, err: boolean, color: string, text: string, type: string } & typeof defaultProps;

const defaultProps = {
    callback: () => { },
    err: false,
    color: "green",
    text: "Aceptar",
    type: "button"
}

const PrimaryButton = (props: primaryButtonProps) => {
    return (
        <button
            onClick={props.callback}
            disabled={props.err}
            className={`hover:scale-105 
            ${props.err ? "bg-gray-500" : `bg-${props.color}-500 hover:bg-${props.color}-700`} 
            text-white font-bold my-4 py-2 px-4 rounded-lg w-32 `}
            type="submit">
            {props.text}
        </button>
    )
}

PrimaryButton.defaultProps = defaultProps;

export default PrimaryButton;