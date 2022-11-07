import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/header'

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
      </main>

      <footer>
      </footer>
    </div>
  )
}

export default Home
