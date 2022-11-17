import Head from "next/head";
import { useState } from "react";

import Cards, { Focused } from "react-credit-cards";
import creditCardType from 'credit-card-type';
import { useCookies } from "react-cookie";
import 'react-credit-cards/es/styles-compiled.css';
import jwt from "jsonwebtoken";
import axios from "axios";

import Header from "../../components/header";
import Input from "../../components/forms/input";
import PrimaryButton from "../../components/buttons/primary";

const AddPaymentMethod = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardExpire, setCardExpire] = useState("");
    const [cardCvv, setCardCvv] = useState("");
    const [focus, setFocus] = useState("name");
    const [cookie, setCookie] = useCookies(["token"]);

    const handleChange = (field: string, event: any) => {
        const value = event.target.value;

        switch (field) {
            case "cardNumber":
                setCardNumber(value);
                setFocus("number");
                event.target.value = value.slice(0, 16)
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
                event.target.value = value.slice(0, 4)
                break;
        }
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const card_category = creditCardType(cardNumber)[0].type;

        const user = jwt.decode(cookie.token) as { id: number, role: number };
        
        if (user) {
            const data = {
                card_number: cardNumber,
                exp_month: cardExpire.split("/")[0],
                exp_year: cardExpire.split("/")[1],
                cvv: cardCvv,
                card_owner: user.id,
                card_type: "credit",
                card_category: card_category
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}/pay-methods`, {
                ...data
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookie.token}`
                }
            });
        }

    }
    return (
        <>
            <Head>
                <title>Agregar Tarjeta</title>
            </Head>

            <Header />
            <main>
                <form id="card-form" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <div className="mt-14">
                            <Cards number={cardNumber} cvc={cardCvv} expiry={cardExpire} name={cardName} focused={focus as Focused} />
                        </div>
                        <div className="mx-auto mt-10 grid grid-cols-2 gap-x-32 justify-items-center w-6/12">
                            <Input onChange={(e) => handleChange("cardNumber", e)} label="Número de tarjeta" type="number" name="card_number"></Input>
                            <Input onChange={e => handleChange("cardName", e)} label="Nombre del propietario" type="text"></Input>
                            <Input onChange={e => handleChange("cardExpire", e)} label="Fecha de expiración" type="month" name="expire"></Input >
                            <Input onChange={e => handleChange("cardCvv", e)} label="Código de seguridad" type="number" min="1" max="9999" name="cvv"></Input>
                        </div>

                        <div className="flex justify-center mt-2">
                            <PrimaryButton type="submit" ></PrimaryButton>
                        </div>
                    </div>
                </form>
            </main>
        </>
    );
}

export default AddPaymentMethod;