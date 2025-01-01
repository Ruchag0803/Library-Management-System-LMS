import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/axios';
import '../styles/BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient.get(`/books/${id}/`)
      .then(response => setBook(response.data))
      .catch(() => setError('Error fetching book details'));
  }, [id]);

  return (
    <div>
      <h1>Book Details</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {book ? (
        <div>
          <p>Title: {book.title}</p>
          <p>Author: {book.author}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Publication Date: {book.publication_date}</p>
          <p>Status: {book.availability_status ? 'Available' : 'Not Available'}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookDetails;
