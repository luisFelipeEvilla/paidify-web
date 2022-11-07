const PrimaryButton = ({err = false, color = "green", text = "Aceptar"}) => {
    return (
        <button
            disabled={err}
            className={`hover:scale-105 
            ${err ? "bg-gray-500" : `bg-${color}-500 hover:bg-${color}-700`} 
            text-white font-bold my-4 py-2 px-4 rounded-lg w-32 `}
            type="submit">
            {text}
        </button>
    )
}

export default PrimaryButton;