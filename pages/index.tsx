import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/header';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Invoice from '../components/invoice';

const Home: NextPage = () => {
  const invoices = [
    {
      concept: "Pago de servicios",
      paymentDate: "12/12/2021",
      invoiceNumber: 123456,
      amount: 3044932
    },
    {
      concept: "Pago de Matricula",
      paymentDate: "9/12/2022",
      invoiceNumber: 123456,
      amount: 3000000
    },
    {
      concept: "Pago de Matricula",
      paymentDate: "9/12/2022",
      invoiceNumber: 123456,
      amount: 3000000
    }
  ]

  return (
    <div>
      <Head>
        <title>Paidify</title>
        <meta name="description" content="Created by Luis Felipe Evilla Rodriguez" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header></Header>
        <div className={styles.hero + " mt-8 "}>
          <Image src="/images/hero.png" width={620} height={310} />
        </div>

        {
          invoices.map(invoice => (
            <Invoice 
            concept={invoice.concept}
            paymentDate={invoice.paymentDate}
            invoiceNumber={invoice.invoiceNumber}
            amount={invoice.amount} />
          ))
        }
      </main>

      <footer>
      </footer>
    </div>
  )
}

export default Home
