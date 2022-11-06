import { NextPage } from "next";
import Image from 'next/image'
import Link from "next/link";
import Input from "../components/forms/input";

const Signin: NextPage = () => {
    return (
        <div className="flex">

            <div className="h-screen flex items-center justify-center w-5/12 bg-blue-900">
                <Image className="" src="/images/signin_banner.svg" width="700" height="700" />
            </div>

            <div className="m-auto">
                <h1 className="text-4xl text-center mb-10 font-bold"> Bienvenido </h1>

                <form>
                    <Input label={"Usuario"} name={"email"} type={"email"} required={true} />
                    <Input label={"Contraseña"} name={"password"} type={"password"} id={"password"} required={true} />

                    <p className="text-sm mt-4">¿Aún no tienes una cuenta? <Link href="/signup"><a className="text-blue-500 text-lg hover:scale-150">Registrate</a></Link></p>

                    <div className="flex justify-center	">
                        <button className="hover:scale-105 bg-green-500 hover:bg-green-700 text-white font-bold my-4 py-2 px-4 rounded-lg w-32" type="submit">Ingresar</button>
                    </div>
                </form>
            </div>

        </div>
    )
};

export default Signin;