import Link from 'next/link'
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from '../../styles/Home.module.css'

const BookCreate = () => {
  const router = useRouter();
  const [bookTitle, setBookTitle] = useState('');
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        title: bookTitle
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
          Book Create
      </h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={bookTitle}
          disabled={submitting}
          data-cy="input-book-title"
          onChange={(e) => setBookTitle(e.target.value)}
        />
        <button
          disabled={submitting}
          data-cy="button-submit-book"
        >{ submitting ? 'Sending...' : 'Send' }</button>
        { errors.title && (
          <span style={{color: 'red', display: 'block'}}>{ errors.title }</span>
        )}
      </form>
      <Link href="/books">Books List</Link>      
    </div>
  )
}

export default BookCreate
