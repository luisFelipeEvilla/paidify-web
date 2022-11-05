import { NextPage } from "next";
import Image from 'next/image'
import { HTMLInputTypeAttribute } from "react";

const Signin: NextPage = () => {

    const showPassword = () => {
        const password = document.getElementById("password") as HTMLInputElement;
 
        if (password === null) return null;

        password.type === "password" ? password.type = "text" : password.type = "password";
    }
    return (
        <div className="flex">

            <div className="h-screen flex items-center justify-center w-5/12 bg-blue-900">
                <Image className="" src="/images/signin_banner.svg" width="700" height="700" />
            </div>

            <div className="m-auto">
                <h1 className="text-4xl text-center mb-10 font-bold"> Bienvenido </h1>

                <form>
                    <label htmlFor="email" className="block text-xl ml-1.5 my-2.5 font-semibold">Usuario</label>
                    <input className="mb-3.5 shadow-md appearance-none border rounded-md w-80 h-8 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" type="email" name="email" id="email" />
                    <label htmlFor="password" className="block text-xl ml-1.5 my-2.5 font-semibold">Contraseña</label>

                    <div className="flex flex-row align-items mb-3.5 shadow-md appearance-none border rounded-md w-80 h-8 py-2 px-3 focus:shadow-outline">
                        <input className="w-full y-full focus:outline-none text-gray-700" type="password" name="password" id="password" />
                        <Image onClick={showPassword} className="hover:cursor-pointer" src="/show.png" alt="Vercel Logo" width={20} height={20} />
                    </div>

                    <p className="text-sm mt-4">¿Aún no tienes una cuenta? <a className="text-blue-500 text-lg hover:scale-150	" href="/signup">Registrate</a></p>

                    <div className="flex justify-center	">
                        <button className="hover:scale-105 bg-green-500 hover:bg-green-700 text-white font-bold my-4 py-2 px-4 rounded-lg w-32" type="submit">Ingresar</button>
                    </div>
                </form>
            </div>-lg

        </div>
    )
};

export default Signin;