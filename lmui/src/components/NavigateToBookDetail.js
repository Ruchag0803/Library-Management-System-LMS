import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NavigateToBookDetail.css';

function NavigateToBookDetail() {
  const [bookId, setBookId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (bookId) {
      navigate(`/books/${bookId}`);
    }
  };

  return (
    <div>
      <h2>Go to Book Details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="bookId">Enter Book ID: </label>
        <input
          type="text"
          id="bookId"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          required
        />
        <button type="submit">Go</button>
      </form>
    </div>
  );
}

export default NavigateToBookDetail;
