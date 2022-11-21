import Cookies from "cookies";
import Head from "next/head";
import { useState } from "react";
import Hero from "../../../components/hero";
import jwt from "jsonwebtoken";
import { API_URL } from "../../../config";
import Header from "../../../components/headers/user";
import Payment from "../../../domain/user/Payment";
import { ACCESS_TOKEN, ROLE_ADMIN } from "../../../utils/constants";
import InfoCard from "../../../components/infoCards/payment";
import { displayFullDate, withDots } from "../../../utils/general";

type Props = { payment: Payment };

const History = ({ payment }: Props) => {
    const { amount, balance, campus, card_type, date, effective_date, fulfilled, gateway_date,
        id, num_installments, payment_concept, ref_number, successful } = payment;

    const getPaymentState = () => effective_date ? successful ? 'Exitoso' : 'Fallido' : 'Pendiente';
    const getColor = () => effective_date ? successful ? 'green' : 'red' : 'yellow';

    return (
        <div>
            <Head>
                <title>Historial | Paidify</title>
                <meta name="description" content="Created by Luis Felipe Evilla Rodriguez" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Header />

                <div className="w-4/5 mx-auto">
                    <h1 className="text-2xl mt-12 mb-4">Detalle de Pago</h1>

                    <div className="flex gap-4 align-top">
                        <div
                            className='shadow-lg border-gray-300 border p-8 mx-auto flex justify-between rounded w-6/12 cursor-pointer relative'
                        >
                            <div className="flex flex-col gap-5">
                                <><b>Concepto: </b> {payment_concept.payment_concept}</>
                                <div className='flex gap-3 justify-between'>
                                    <p>
                                        <><b>Cuotas: </b> {num_installments}</>
                                    </p>
                                    <p>
                                        <><b>Monto: </b> {withDots(payment_concept.amount)}</>
                                    </p>
                                </div>

                                <p className='pt-1'><b>Sede: </b> {campus} </p>
                                <p className='pt-1'><b>Ref. de Pago: </b> {ref_number} </p>

                                <hr />

                                <div className="flex gap-3 justify-between">
                                    <p className='pt-3'><b>Fecha de Pago: </b> {displayFullDate(new Date(date))} </p>
                                    <p className='pt-3'><b>Fecha de Pasarela de Pago: </b> {displayFullDate(new Date(gateway_date))} </p>
                                    {effective_date ? <p className='pt-3'><b>Fecha Efectiva: </b> {displayFullDate(new Date(effective_date))} </p> : null}
                                </div>

                            </div>

                            <div className='text-center'>
                                <p className={`text-${getColor()}-500`}> <b> {getPaymentState()} </b> </p>
                            </div>
                        </div>

                        <div className="max-h-">
                            <Hero />
                        </div>

                    </div>
                </div>
            </main>

            <footer>
            </footer>
        </div>
    )
}

export async function getServerSideProps({ req, res, params }: any) {
    const refNumber = params.refNumber;

    const cookies = new Cookies(req, res);

    const token = cookies.get(ACCESS_TOKEN) as string;

    if (!token) {
        return {
            redirect: {
                destination: '/guest',
                permanent: true,
            }
        }
    }

    const user = jwt.decode(token) as { id: number, role: number };

    if (!user) {
        return {
            redirect: {
                destination: '/guest',
                permanent: true,
            }
        }
    }

    if (user.role === ROLE_ADMIN) {
        return {
            redirect: {
                destination: '/admin',
                permanent: true,
            }
        }
    }

    let response;

    try {
        response = await fetch(`${API_URL}/users/${user.id}/payments?ref_number=${refNumber}&$limit=1`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        return {
            redirect: {
                destination: '/user/history',
                permanent: true,
            }
        };
    }

    let data;

    if (response.status === 200) {
        data = await response.json();
    } else {
        return {
            redirect: {
                destination: '/user/history',
                permanent: true,
            }
        };
    }

    // console.log(data);

    return {
        props: { payment: data[0] }
    };
}

export default History;
