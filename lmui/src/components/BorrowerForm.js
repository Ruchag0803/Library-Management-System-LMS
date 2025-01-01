import apiClient from '../api/axios';
import '../styles/BorrowerForm.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BorrowerForm = () => {
  const [borrower, setBorrower] = useState({
    name: '',
    email: '',
    borrowed_books: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch borrower data if editing
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      axios.get(`http://localhost:8000/borrowers/${id}/`)
        .then((response) => {
          setBorrower(response.data);
        })
        .catch((error) => console.error('Error fetching borrower:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBorrower((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      axios.put(`http://localhost:8000/borrowers/${id}/`, borrower)
        .then(() => {
          alert('Borrower updated successfully');
          navigate(`/borrowers/${id}`);
        })
        .catch((error) => console.error('Error updating borrower:', error));
    } else {
      axios.post('http://localhost:8000/borrowers/', borrower)
        .then(() => {
          alert('Borrower created successfully');
          navigate('/borrowers');
        })
        .catch((error) => console.error('Error creating borrower:', error));
    }
  };

  return (
    <div className="form-container">
      <h2>{isEditing ? 'Edit Borrower' : 'Create New Borrower'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={borrower.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={borrower.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Borrowed Books</label>
          <input type="text" name="borrowed_books" value={borrower.borrowed_books} onChange={handleChange} />
        </div>
        <button type="submit">{isEditing ? 'Update Borrower' : 'Create Borrower'}</button>
      </form>
    </div>
  );
};

export default BorrowerForm;
