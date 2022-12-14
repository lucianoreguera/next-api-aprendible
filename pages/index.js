import Head from 'next/head'
import Link from "next/link";
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Books App</title>
        <meta name="description" content="Books App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Books App</h1>
      <Link 
        href="/books"
        data-cy="link-to-books"
      >Book List</Link>
    </div>
  )
}
