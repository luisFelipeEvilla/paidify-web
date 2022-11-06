import axios from "axios";
import { NextPage } from "next";
import Image from 'next/image'
import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Input from "../components/forms/input";

const Signin: NextPage = () => {
    const [err, setError] = useState(false);
    const [cookie, setCookie] = useCookies(["token"]);

    const handleOnCahnge = () => {
        if (err) setError(false);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const user = e.target.user.value;
        const password = e.target.password.value;

        axios.post("https://paidify-api.azurewebsites.net/v1/auth/login", {
            user,
            password
        }).then((res) => {
            setCookie("token", res.data.token, {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
            });
            Router.push('/');
        }).catch((err) => {
            setError(true);
        })
    }

    return (
        <div className="flex">

            <div className="h-screen flex items-center justify-center w-5/12 bg-blue-900">
                <Image className="" src="/images/signin_banner.svg" width="700" height="700" />
            </div>

            <div className="m-auto">
                <h1 className="text-4xl text-center mb-10 font-bold"> Bienvenido </h1>

                <form onSubmit={handleSubmit}>
                    <Input onChange={handleOnCahnge} label={"Usuario"} name={"user"} type={"email"} required={true} />
                    <p id="errorMessage" className={`${err ? "visible" : "hidden"} text-red-500 text-m`}>Eror, credenciales incorrectas</p>
                    <Input onChange={handleOnCahnge} label={"Contraseña"} name={"password"} type={"password"} id={"password"} required={true} />
                    <p className="text-sm mt-4">¿Aún no tienes una cuenta? <Link href="/signup"><a className="text-blue-500 text-lg hover:scale-150">Registrate</a></Link></p>

                    <div className="flex justify-center	">
                        <button disabled={err}
                            className={`hover:scale-105 ${err ? "bg-gray-500" : "bg-green-500 hover:bg-green-700"} text-white font-bold my-4 py-2 px-4 rounded-lg w-32 `} type="submit">Ingresar</button>
                    </div>
                </form>
            </div>

        </div>
    )
};

export default Signin;