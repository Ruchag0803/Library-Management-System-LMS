import React, { useState } from 'react';
import apiClient from '../api/axios';
import '../styles/BorrowReturnBook.css';
const BorrowReturnBook = () => {
  const [borrowerId, setBorrowerId] = useState('');
  const [bookId, setBookId] = useState('');
  const [actionType, setActionType] = useState('borrow'); // borrow or return
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    apiClient.post('/borrow-return-book/', {
      borrower_id: borrowerId,
      book_id: bookId,
      action_type: actionType,
    })
      .then(response => {
        setMessage(`Book successfully ${actionType}ed.`);
        setError('');
      })
      .catch(err => {
        setMessage('');
        setError('Error processing the request.');
      });
  };

  return (
    <div>
      <h1>Borrow or Return a Book</h1>
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
        <br />
        <label>
          Book ID:
          <input
            type="text"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Action:
          <select value={actionType} onChange={(e) => setActionType(e.target.value)}>
            <option value="borrow">Borrow</option>
            <option value="return">Return</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default BorrowReturnBook;
