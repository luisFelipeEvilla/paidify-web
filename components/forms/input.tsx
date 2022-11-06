import Image from "next/image";
import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & { label: string };

const inputDesign = "mb-3.5 shadow-md appearance-none border rounded-md w-80 h-10 text-l px-3 text-gray-700 focus:outline-none focus:shadow-outline";

const Input = (props: InputProps) => {
    const showPassword = () => {
        console.log(props.type);

        const id = props.id as string;
        
        const password = document.getElementById(id) as HTMLInputElement;
        
        if (password === null) return null;

        password.type === "password" ? password.type = "text" : password.type = "password";
    }

    return (
        props.type?.localeCompare("password") != 0 ?
            <div className="field">
                <label htmlFor={props.name} className="block text-xl ml-1.5 my-2.5 font-semibold">{props.label}</label>
                <input className={inputDesign} {...props} />
            </div>
            :
            <div className="field">
                <label htmlFor={props.name} className="block text-xl ml-1.5 my-2.5 font-semibold">{props.label}</label>
                <div className={"flex flex-row align-items " + inputDesign}>
                    <input className="w-full y-full focus:outline-none" {...props} />
                    <div style={{ position: "relative", width: "20px", heigth: "20px"}} >
                        <Image onClick={showPassword} className="hover:cursor-pointer p-1" src="/icons8-eye-30.png" alt="Vercel Logo" layout="fill" objectFit="contain" />
                    </div>
                </div>
            </div>
    )
}

export default Input;