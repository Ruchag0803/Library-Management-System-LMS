import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/BookForm.css';

const BookForm = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    isbn: '',
    publication_date: '',
    availability_status: true,
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch book data if editing
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      axios.get(`http://localhost:8000/books/${id}/`)
        .then((response) => {
          setBook(response.data);
        })
        .catch((error) => console.error('Error fetching book:', error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      axios.put(`http://localhost:8000/books/${id}/`, book)
        .then(() => {
          alert('Book updated successfully');
          navigate(`/books/${id}`);
        })
        .catch((error) => console.error('Error updating book:', error));
    } else {
      axios.post('http://localhost:8000/books/', book)
        .then(() => {
          alert('Book created successfully');
          navigate('/books');
        })
        .catch((error) => console.error('Error creating book:', error));
    }
  };

  return (
    <div className="form-container">
      <h2>{isEditing ? 'Edit Book' : 'Create New Book'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" name="title" value={book.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Author</label>
          <input type="text" name="author" value={book.author} onChange={handleChange} required />
        </div>
        <div>
          <label>ISBN</label>
          <input type="text" name="isbn" value={book.isbn} onChange={handleChange} required />
        </div>
        <div>
          <label>Publication Date</label>
          <input type="date" name="publication_date" value={book.publication_date} onChange={handleChange} required />
        </div>
        <div>
          <label>Availability Status</label>
          <input type="checkbox" name="availability_status" checked={book.availability_status} onChange={() => setBook((prev) => ({ ...prev, availability_status: !prev.availability_status }))} />
        </div>
        <button type="submit">{isEditing ? 'Update Book' : 'Create Book'}</button>
      </form>
    </div>
  );
};

export default BookForm;
