import React, { useEffect, useState } from 'react';
import apiClient from '../api/axios';
import '../styles/BooksList.css';
const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all books
    apiClient.get('/books/')
      .then(response => setBooks(response.data))
      .catch(error => setError('Error fetching books'));
  }, []);

  return (
    <div>
      <h1>Books List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} by {book.author} - {book.availability_status ? 'Available' : 'Not Available'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
