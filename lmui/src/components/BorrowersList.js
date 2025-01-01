import React, { useEffect, useState } from 'react';
import apiClient from '../api/axios';
import '../styles/BorrowersList.css';
const BorrowerList = () => {
  const [borrowers, setBorrowers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all borrowers
    apiClient.get('/borrowers/')
      .then(response => setBorrowers(response.data))
      .catch(error => setError('Error fetching borrowers'));
  }, []);

  return (
    <div>
      <h1>Borrowers List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {borrowers.map(borrower => (
          <li key={borrower.id}>
            {borrower.name} ({borrower.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BorrowerList;
