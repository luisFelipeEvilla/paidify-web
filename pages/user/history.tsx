import Cookies from "cookies";
import Head from "next/head";
import { useState } from "react";
import Header from "../components/header";
import Hero from "../components/hero";
import Invoice from "../components/infoCard";
import SearchBar from "../components/searchBar";
import jwt from "jsonwebtoken";
import { API_URL } from "../config";
import Payment from "../domain/payments";
import paymentsData from "../repositories/payments";
import { ACCESS_TOKEN } from "../utils/constants";

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
    const cookies = new Cookies(req, res);
  
    const token = cookies.get(ACCESS_TOKEN) as string;
    
    const user = jwt.decode(token) as { id: number };
    
    const url = `${API_URL}/users/${user?.id}/invoices`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    const data = await response.json(); 
    
    return {
      props: { data:  paymentsData}
    }
  }

export default History;