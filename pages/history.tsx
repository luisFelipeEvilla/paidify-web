import Cookies from "cookies";
import Head from "next/head";
import { useState } from "react";
import Header from "../components/header";
import Hero from "../components/hero";
import Invoice from "../components/infoCard";
import SearchBar from "../components/searchBar";
import jwt from "jsonwebtoken";
import { API_URL } from "../config";
import Payment from "../domain/payment";
import paymentsData from "../repositories/payments";
import { fetchData, getUserData } from "../utils/utiils";

type payments = { data: Payment[] };

const History = ({data}: payments) => {    
    const [invoices, setInvoices] = useState(data);

    function handleChange(search: any) {
        setInvoices(
            data.filter((invoice: Payment) => {
                return invoice.payment_concept.payment_concept.toLowerCase().includes(search.toLowerCase());
            })
        );
    };

    return (
        <div>
            <Head>
                <title>Paidify</title>
                <meta name="description" content="Created by Luis Felipe Evilla Rodriguez" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Header />
                <Hero />
                <div className="flex">
                    <div className="m-auto">
                        <SearchBar
                            handleChange={handleChange}
                        ></SearchBar>
                    </div>
                </div>
                {
                    invoices.map((invoice: Payment) => (
                        <Invoice
                            key={invoice.id}
                            concept={invoice.payment_concept.payment_concept}
                            paymentDate={invoice.date}
                            invoiceNumber={invoice.ref_number}
                            amount={invoice.payment_concept.amount} 
                            state={invoice.successful}
                            isConcept={false}
                            effectiveDate={invoice.effective_date}
                            />
                    ))
                }
            </main>

            <footer>
            </footer>
        </div>
    )
}

export async function getServerSideProps({req, res} : any) {
    const user = await getUserData(req, res);
    const data = await fetchData(`/users/${user.id}/invoices`, req, res);
  
    
    return {
    //todo return real data when the api is ready
      props: { data:  paymentsData}
    }
  }

export default History;