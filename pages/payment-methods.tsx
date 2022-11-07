import Head from "next/head";
import Header from "../components/header";
import Cards from "react-credit-cards";
import jwt from "jsonwebtoken";

import 'react-credit-cards/es/styles-compiled.css';
import Cookies from "cookies";
import { API_URL } from "../config";
import { useState } from "react";

type card = {
    cardNumber: number;
    exp_month: number;
    exp_year: number;
    cvv: number;
    owner: string;
}

const PaymentMethods = ({data} : {data: card[]}) => {
    const [cards, setCards] = useState(data);

    return (
        <>
            <Head>
                <title>Payment Methods</title>
            </Head>
            <Header />
            <main className="">
                <div style={{ height: '80vh' }} className="flex">
                    
                    <div className=" m-auto">
                        {
                            cards.map((card) => (
                                <Cards 
                                    number={card.cardNumber + ""}
                                    name={card.owner}
                                    expiry={`${card.exp_month}/${card.exp_year}`}
                                    cvc={card.cvv}
                                />
                            ))
                        }
                    </div>
                </div>


            </main>
        </>
    )
}

export async function getServerSideProps({ req, res }) {
    const cookies = new Cookies(req, res);

    const token = cookies.get('token') as string;

    const user = jwt.decode(token) as { id: number };

    const url = `${API_URL}/users/${user?.id}/cards`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    
    return { props: {data}}
}

export default PaymentMethods;
