import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../../../styles/Home.module.css'

export async function getServerSideProps({params}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.id}`);
  const data = await res.json();

  return {
    props: {
      book: data
    }
  }
}

const BookEdit = ({ book }) => {
  const router = useRouter();
  const [bookTitle, setBookTitle] = useState(book.title);
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${book.id}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        title: bookTitle,
        _method: 'PATCH'
      })
    });

    if (res.ok) {
      setErrors([]);
      setBookTitle('');

      return router.push('/books');
    }
    
    const data = await res.json();
    setErrors(data.errors);
    setSubmitting(false);
  }

  return (
    <div className={styles.container}>
      <h1>
          Book Edit
      </h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={bookTitle}
          disabled={submitting}
          onChange={(e) => setBookTitle(e.target.value)}
        />
        <button
          disabled={submitting}
        >{ submitting ? 'Sending...' : 'Send' }</button>
        { errors.title && (
          <span style={{color: 'red', display: 'block'}}>{ errors.title }</span>
        )}
      </form>
      <Link href="/books">Books List</Link>      
    </div>
  )
}

export default BookEdit
