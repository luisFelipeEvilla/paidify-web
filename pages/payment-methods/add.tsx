import Header from "../../components/header";
import Cards, { Focused } from "react-credit-cards";

import 'react-credit-cards/es/styles-compiled.css';
import { useState } from "react";
import Input from "../../components/forms/input";
import PrimaryButton from "../../components/buttons/primary";
import Head from "next/head";

const AddPaymentMethod = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardExpire, setCardExpire] = useState("");
    const [cardCvv, setCardCvv] = useState("");
    const [focus, setFocus] = useState("name");

    const handleChange = (field: string, event: any) => {
        const value = event.target.value;

        switch (field) {
            case "cardNumber":
                setCardNumber(value);
                setFocus("number");
                event.target.value = value.slice(0,16)
                break;
            case "cardName":
                setCardName(value);
                event.target.value = value.toUpperCase();
                setFocus("name");
                break;
            case "cardExpire":
                const values = value.split("-");
                const expireDate = `${values[1]}/${values[0]}`;
                setCardExpire(expireDate);
                setFocus("expiry");
                break;
            case "cardCvv":
                setCardCvv(value);
                setFocus("cvc");
                event.target.value = value.slice(0,4)
                break;
        }
    }
    return (
        <>
            <Head>
                <title>Agregar Tarjeta</title>
            </Head>
                
            <Header />
            <main>
                <form>
                    <div className="flex flex-col">
                        <div className="mt-14">
                            <Cards number={cardNumber} cvc={cardCvv} expiry={cardExpire} name={cardName} focused={focus as Focused}/>
                        </div>
                        <div className="mx-auto mt-10 grid grid-cols-2 gap-x-32 justify-items-center w-6/12">
                            <Input onChange={(e) => handleChange("cardNumber", e) } label="Número de tarjeta" type="number"></Input>
                            <Input onChange={e => handleChange("cardName", e)} label="Nombre del propietario" type="text"></Input>
                            <Input onChange={e => handleChange("cardExpire", e)} label="Fecha de expiración" type="month"></Input>
                            <Input onChange={e => handleChange("cardCvv", e)} label="Código de seguridad" type="number" min="1" max="9999"></Input>
                        </div>

                        <div className="flex justify-center mt-2">
                            <PrimaryButton></PrimaryButton>
                        </div>
                    </div>
                </form>
            </main>
        </>
    );
}

export default AddPaymentMethod;