import Head from "next/head";
import { useState } from "react";
import Router from "next/router";

// third party libraries
import Cards from "react-credit-cards";
import jwt from "jsonwebtoken";
import Slider from "react-slick";
import Cookies from "cookies";

// css for carrousels
import 'react-credit-cards/es/styles-compiled.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// config vars
import { API_URL } from "../../config";

// components
import Header from "../../components/header";

// fake data
import creditCards from "../../domain/creditCards";
import { fetchData, getUserData } from "../../utils/utiils";

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
    const user = await getUserData(req, res);
    const data = await fetchData(`/users/${user.id}/cards`, req, res);

    return {
        props: {
            // todo return real data when the endpoint is ready
            data: creditCards
        }
    }
}

export default PaymentMethods;
