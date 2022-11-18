
import { NextPage } from "next";
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

// import axios, { AxiosRequestConfig } from "axios";
import { API_URL } from "../config";

import PrimaryButton from "../components/buttons/primary";
import Input from "../components/forms/input";
import { ACCESS_TOKEN } from "../utils/constants";
import { useCookies } from "react-cookie";

const Signin: NextPage = () => {
    const [error, setError] = useState(false);
    const router = useRouter();
    
    const [cookie, setCookie] = useCookies([ACCESS_TOKEN]);

    const handleOnChange = () => {
        if (error) setError(false);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        let response : any;

        try {
            response = await fetch(API_URL + '/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            })
        } catch (err) {
            console.log(err);
            setError(true);
        }

        if(response.status === 200) {
            const data = await response.json();
            setCookie(ACCESS_TOKEN, data.token, {
                path: '/',
                maxAge: 3600, // Expires after 1hr
                sameSite: true
            });
            router.replace('/');
        } else {
            setError(true);
        }
    }

    return (
        <div className="flex">

            <div className="h-screen flex items-center justify-center w-5/12 bg-blue-900">
                <Image className="" src="/images/signin_banner.svg" width="700" height="700" />
            </div>

            <div className="m-auto">
                <h1 className="text-4xl text-center mb-10 font-bold"> Bienvenido </h1>

                <form onSubmit={handleSubmit}>
                    <Input onChange={handleOnChange} label={"Usuario"} name={"username"} type={"text"} required={true} />
                    <p id="errorMessage" className={`${error ? "visible" : "hidden"} text-red-500 text-m`}>Eror, credenciales incorrectas</p>
                    <Input onChange={handleOnChange} label={"Contraseña"} name={"password"} type={"password"} id={"password"} required={true} />
                    <p className="text-sm mt-4">¿Aún no tienes una cuenta? <Link href="/signup"><a className="text-blue-500 text-lg hover:scale-150">Registrate</a></Link></p>

                    <div className="flex justify-center	">
                        <PrimaryButton err={error} text={"Ingresar"} />
                    </div>
                </form>
            </div>

        </div>
    )
};

export default Signin;
