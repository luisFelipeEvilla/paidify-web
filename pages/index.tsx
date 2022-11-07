import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/header';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
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
            <Image src="/images/hero.png" width={620} height={310}  />
          </div>
      </main>

      <footer>
      </footer>
    </div>
  )
}

export default Home
