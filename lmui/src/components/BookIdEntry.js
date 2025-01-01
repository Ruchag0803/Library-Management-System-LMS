import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BookIdEntry.css';

const BookIdEntry = () => {
  const [bookId, setBookId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookId.trim()) {
      navigate(`/books/${bookId}/edit`); 
    } else {
      alert('Please enter a valid Book ID');
    }
  };

  return (
    <div className="book-id-entry">
      <h1>Enter Book ID</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="book-id-input">
          Book ID:
          <input
            id="book-id-input"
            type="text"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            required
            placeholder="Enter Book ID"
          />
        </label>
        <button type="submit" className="submit-btn">Go to Update Page</button>
      </form>
    </div>
  );
};

export default BookIdEntry;
