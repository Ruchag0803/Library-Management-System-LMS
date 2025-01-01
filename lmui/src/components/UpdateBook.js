import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../api/axios';
import '../styles/UpdateBook.css';

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publication_date: '',
    availability_status: false,
  });

  // Fetch existing book details
  useEffect(() => {
    apiClient
      .get(`/books/${id}/`)
      .then((response) => {
        setBook(response.data);
        setFormData({
          title: response.data.title,
          author: response.data.author,
          isbn: response.data.isbn,
          publication_date: response.data.publication_date,
          availability_status: response.data.availability_status,
        });
      })
      .catch(() => setError('Error fetching book details'));
  }, [id]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    apiClient
      .put(`/books/${id}/`, formData)
      .then(() => {
        alert('Book details updated successfully!');
        navigate(`/books/${id}`);
      })
      .catch(() => alert('Error updating book details'));
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Update Book Details</h1>
      {book ? (
        <form onSubmit={handleSubmit} className="update-form">
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            ISBN:
            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Publication Date:
            <input
              type="date"
              name="publication_date"
              value={formData.publication_date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Availability Status:
            <input
              type="checkbox"
              name="availability_status"
              checked={formData.availability_status}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Update Book</button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UpdateBook;
