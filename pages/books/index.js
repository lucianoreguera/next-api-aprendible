import Link from 'next/link';
import styles from '../../styles/Home.module.css'

export async function getServerSideProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`);
    const data = await res.json();

    return {
        props: {
            books: data
        }
    }
}

const BookList = ({ books }) => {
    async function handleDelete(e, bookId) {
        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookId}`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                _method: 'DELETE'
            })
        });

        if (res.ok) {
            window.location.href = '/books';
        }
    }

    return (
        <div className={styles.container}>
            <h1>Books</h1>
            <ul data-cy="books-list">
                {
                    books.map(book => (
                        <li key={`book-${book.id}`}>
                            <Link href={`books/${book.id}`}>{book.title}</Link>
                            {' - '}
                            <Link href={`books/${book.id}/edit`}>Edit</Link>
                            {' - '}
                            <form 
                                onSubmit={(e) => handleDelete(e, book.id)}
                                style={{display: 'inline'}}
                            >
                                <button>Delete</button>
                            </form>
                        </li>
                    ))
                }
            </ul>
            <Link href="/books/create">Create Book</Link>
        </div>
    )
}

export default BookList;