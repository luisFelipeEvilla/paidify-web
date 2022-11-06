import { NextPage } from "next";
import Link from "next/link";
import Input from "../components/forms/input";

const Signup = () => {
    return (
                <form className="">
                    <div className="flex flex-col items-center justify-center h-screen">
                        <div className="grid grid-cols-2 gap-x-32 justify-items-center w-6/12">
                            <Input label={"Nombres"} name={"name"} type={"text"} />
                            <Input label={"Apellidos"} name={"lastName"} type={"text"} />
                            <Input label={"Email"} name={"email"} type={"text"} />
                            <Input label={"Sede"} name={"campus"} type={"text"} />
                            <Input label={"Contraseña"} name={"password"} type={"password"} />
                            <Input label={"Confirmar Contraseña"} name={"passwordConfirmation"} type={"password"} />
                        </div>

                        <div className="flex justify-center mt-4">
                            <Link href="/signin">
                                <button className="mr-10 hover:scale-105 bg-red-500 hover:bg-red-700 text-white font-bold my-4 py-2 px-4 rounded-lg w-32">Cancelar</button>
                            </Link>
                            <button className="hover:scale-105 bg-green-500 hover:bg-green-700 text-white font-bold my-4 py-2 px-4 rounded-lg w-32" type="submit">Ingresar</button>
                        </div>
                    </div>

                </form>
    )
}

export default Signup;