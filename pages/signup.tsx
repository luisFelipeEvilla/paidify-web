import Link from "next/link";
import Input from "../components/forms/input";

const Signup = () => {

    const campus = ["Barranquilla", "Cartagena", "Santa Marta", "Sincelejo", "Monteria"];
    const checkPassword = (e: any) => {
        e.preventDefault();

        const password = document.getElementById("password") as HTMLInputElement;
        const confirm_password = document.getElementById("passwordConfirmation") as HTMLInputElement;

        if (password.value != confirm_password.value) {
            const passwordErrorMessage = document.getElementById("passwordErrorMessage") as HTMLParagraphElement;
            passwordErrorMessage.classList.add("visible ");
        } else {
            // ToDO: Send data to the server
        }
    }

    return (
        <form className="">
            <div className="flex flex-col items-center justify-center h-screen">
                <div className="grid grid-cols-2 gap-x-32 justify-items-center w-6/12">
                    <Input  label={"Nombres"} name={"name"} type={"text"} required={true} />
                    <Input label={"Apellidos"} name={"lastName"} type={"text"} required={true} />
                    <Input label={"Email"} name={"email"} type={"text"} required={true} />
                    <Input label={"Sede"} name={"campus"} type={"text"} required={true} />
                    <div className="">
                        <Input label={"Contraseña"} name={"password"} type={"password"} id={"password"} required={true} minLength={6} />
                        <p className="hidden text-red-500 text-m" id="passwordErrorMessage">Error las contraseñas no coinciden</p>
                    </div>
                    <Input label={"Confirmar Contraseña"} name={"passwordConfirmation"} type={"password"} id={"passwordConfirmation"} required={true} min={6} />
                </div>

                <div className="flex justify-center mt-4">
                    <Link href="/signin">
                        <button className="mr-10 hover:scale-105 bg-red-500 hover:bg-red-700 text-white font-bold my-4 py-2 px-4 rounded-lg w-32">Cancelar</button>
                    </Link>
                    <button onClick={(e) => checkPassword(e)} className="hover:scale-105 bg-green-500 hover:bg-green-700 text-white font-bold my-4 py-2 px-4 rounded-lg w-32">Ingresar</button>
                </div>
            </div>

        </form>
    )
}

export default Signup;