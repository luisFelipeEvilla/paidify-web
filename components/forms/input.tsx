import Image from "next/image";
import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label: string };

const Input = (props: InputProps) => {
    const showPassword = () => {
        console.log(props.type);
        
        const password = document.getElementById("password") as HTMLInputElement;

        if (password === null) return null;

        password.type === "password" ? password.type = "text" : password.type = "password";
    }

    return (       
        props.type?.localeCompare("password") != 0?
            <div className="field">
                <label htmlFor={props.name} className="block text-xl ml-1.5 my-2.5 font-semibold">{props.label}</label>
                <input className="mb-3.5 shadow-md appearance-none border rounded-md w-80 h-8 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" {...props} />
            </div>
            :
            <div className="field">
                <label htmlFor={props.name} className="block text-xl ml-1.5 my-2.5 font-semibold">{props.label}</label>
                <div className="flex flex-row align-items mb-3.5 shadow-md appearance-none border rounded-md w-80 h-8 py-2 px-3 focus:shadow-outline">
                    <input className="w-full y-full focus:outline-none text-gray-700" {...props} />
                    <Image onClick={showPassword} className="hover:cursor-pointer" src="/show.png" alt="Vercel Logo" width={20} height={20} />
                </div>
            </div>
    )
}

export default Input;