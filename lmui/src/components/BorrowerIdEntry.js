import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BorrowerIdEntry.css';

const BorrowerIdEntry = () => {
  const [borrowerId, setBorrowerId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (borrowerId.trim()) {
      navigate(`/borrowers/${borrowerId}/edit`);
    } else {
      alert('Please enter a valid Borrower ID');
    }
  };

  return (
    <div className="borrower-id-entry">
      <h1>Enter Borrower ID</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Borrower ID:
          <input
            type="text"
            value={borrowerId}
            onChange={(e) => setBorrowerId(e.target.value)}
            required
          />
        </label>
        <button type="submit">Go to Update Page</button>
      </form>
    </div>
  );
};

export default BorrowerIdEntry;
