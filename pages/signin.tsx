import { NextPage } from "next";
import Image from 'next/image'

const Signin: NextPage = () => {
    return (
        <div className="flex">

            <div className="h-screen flex items-center justify-center w-5/12 bg-blue-900">
                <Image className="" src="/images/signin_banner.svg"  width="700" height="700"/>
            </div>

            <div className="m-auto">
                <h1 className="text-4xl text-center mb-10 font-bold"> Inicia Sesión </h1>

                <form>
                    <label htmlFor="email" className="block text-xl my-2.5 font-semibold">Usuario</label>
                    <input className="shadow appearance-none border rounded-md w-80 h-8 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" type="email" name="email" id="email" />
                    <label htmlFor="password" className="block text-xl my-2.5 font-semibold	 ">Contraseña</label>
                    <input className="shadow appearance-none border rounded-md w-80 h-8 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" type="password" name="password" id="password" />

                    <p className="text-sm mt-4">¿Aún no tienes una cuenta? <a className="text-blue-500 text-lg hover:scale-150	" href="/signup">Registrate</a></p>

                    <div className="flex justify-center	">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold my-4 py-2 px-4 rounded " type="submit">Iniciar Sesión</button>
                    </div>
                </form>
            </div>

        </div>
    )
};

export default Signin;