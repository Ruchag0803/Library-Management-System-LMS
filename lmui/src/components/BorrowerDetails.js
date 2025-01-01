import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/axios';
import '../styles/BorrowerDetails.css';
const BorrowerDetails = () => {
  const { id } = useParams();
  const [borrower, setBorrower] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient.get(`/borrowers/${id}/`)
      .then(response => setBorrower(response.data))
      .catch(() => setError('Error fetching borrower details'));
  }, [id]);

  return (
    <div>
      <h1>Borrower Details</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {borrower ? (
        <div>
          <p>Name: {borrower.name}</p>
          <p>Email: {borrower.email}</p>
          <p>Borrowed Books: {borrower.borrowed_books.map(book => book.title).join(', ')}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BorrowerDetails;
