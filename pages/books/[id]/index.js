import Link from 'next/link'
import styles from '../../../styles/Home.module.css'

export async function getStaticProps(context) {
  const id = context.params.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${id}`);
  const data = await res.json();

  return {
    props: {
      book: data
    }
  }
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`);
  const data = await res.json();

  return {
    paths: data.map(book => ({
      params: {id: String(book.id)}
    })),
    fallback: 'blocking'
  }
}

const BookDetail = ({ book }) => {
  return (
    <div className={styles.container}>
      <h1>
          { book.title }
      </h1>

      <Link href="/books">Books List</Link>
    </div>
  )
}

export default BookDetail
