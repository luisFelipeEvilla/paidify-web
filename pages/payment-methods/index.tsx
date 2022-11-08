import Head from "next/head";
import Header from "../../components/header";
import Cards from "react-credit-cards";
import jwt from "jsonwebtoken";
import Slider from "react-slick";
import Image from "next/image";

import 'react-credit-cards/es/styles-compiled.css';
import Cookies from "cookies";
import { API_URL } from "../../config";
import { useState } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Router from "next/router";

type card = {
    card_number: number;
    exp_month: number;
    exp_year: number;
    cvv: number;
    owner: string;
}

const PaymentMethods = ({ data }: { data: card[] }) => {
    const [cards, setCards] = useState(data);

    const redirect = () => {
        Router.push('/payment-methods/add');
    }
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <>
            <Head>
                <title>Payment Methods</title>
            </Head>
            <Header />
            <main className="">
                <div style={{ height: '80vh' }} className="flex">

                    <div style={{ width: "330px", maxWidth: "65%" }} className="m-auto text-right">                    
                        <div className="">
                            <button onClick={redirect} className="mb-4 mr-2.5 hover:scale-105 text-2xl bg-green-500 text-white rounded-full w-11 h-11">
                                +
                            </button>
                        </div>
                        <Slider {...settings}>
                            {
                                cards.map((card) => (
                                    <div className="div">
                                        <Cards
                                            number={card.card_number + ""}
                                            name={card.owner}
                                            expiry={`${card.exp_month}/${card.exp_year}`}
                                            cvc={card.cvv}

                                        />
                                    </div>
                                ))
                            }
                        </Slider>
                    </div>
                </div>


            </main>
        </>
    )
}

export async function getServerSideProps({ req, res }: any) {
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

    //   const data = await response.json();

    const data = [
        {
            id: 8,
            owner: 'luis F',
            card_number: '3700 0000 0000 002',
            exp_month: '06',
            exp_year: '22',
            cvv: '123',
            type: 'credit',
            category: 'visa'
        },
        {
            id: 8,
            owner: 'ENRIQUE VÉLEZ',
            card_number: '5425233430109903',
            exp_month: '10',
            exp_year: '32',
            cvv: '1234',
            type: 'credit',
            category: 'visa'
        },
        {
            id: 8,
            owner: 'ENRIQUE VÉLEZ',
            card_number: '4263982640269299',
            exp_month: '10',
            exp_year: '32',
            cvv: '1234',
            type: 'credit',
            category: 'visa'
        }
    ]
    return { props: { data } }
}

export default PaymentMethods;
