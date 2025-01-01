import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NavigateToBorrowerDetail.css';
function NavigateToBorrowerDetail() {
  const [borrowerId, setBorrowerId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (borrowerId) {
      navigate(`/borrowers/${borrowerId}`);
    }
  };

  return (
    <div>
      <h2>Go to Borrower Details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="borrowerId">Enter Borrower ID: </label>
        <input
          type="text"
          id="borrowerId"
          value={borrowerId}
          onChange={(e) => setBorrowerId(e.target.value)}
          required
        />
        <button type="submit">Go</button>
      </form>
    </div>
  );
}

export default NavigateToBorrowerDetail;
