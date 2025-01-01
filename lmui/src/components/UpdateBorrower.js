import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/UpdateBorrower.css';

const UpdateBorrower = () => {
  const { id } = useParams(); // Get the borrower ID from URL parameters
  const navigate = useNavigate();
  
  // State to store borrower details
  const [borrower, setBorrower] = useState({
    name: '',
    email: '',
    borrowedBook: '' 
  });

  // Loading state for waiting for data
  const [loading, setLoading] = useState(true);

  // Fetch borrower details by ID when component mounts
  useEffect(() => {
    console.log(`Fetching borrower with ID: ${id}`);  // Debugging log
    axios
      .get(`/api/borrowers/${id}`) 
      .then((response) => {
        console.log('Borrower data fetched:', response.data);  // Debugging log
        setBorrower({
          name: response.data.name,
          email: response.data.email,
          borrowedBook: response.data.borrowedBook || ''
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching borrower data:', error); // Debugging log
        setLoading(false);
      });
  }, [id]); // Re-fetch when ID changes

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBorrower = {
      name: borrower.name,
      email: borrower.email
    };

    console.log('Updating borrower with data:', updatedBorrower); // Debugging log
    axios
      .put(`/api/borrowers/${id}`, updatedBorrower) 
      .then((response) => {
        alert('Borrower details updated successfully!');
        console.log('Borrower updated:', response.data);  // Debugging log
        navigate(`/borrowers/${id}`); // Redirect back to borrower details page
      })
      .catch((error) => {
        console.error('Error updating borrower data:', error);  // Debugging log
      });
  };

  // If the data is loading, display a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="update-borrower">
      <h1>Update Borrower Details</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={borrower.name}
            onChange={(e) => setBorrower({ ...borrower, name: e.target.value })}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={borrower.email}
            onChange={(e) => setBorrower({ ...borrower, email: e.target.value })}
            required
          />
        </label>
        <button type="submit">Update Borrower</button>
      </form>
    </div>
  );
};

export default UpdateBorrower;
