import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import HomePage from './components/HomePage';
import BooksList from './components/BooksList';
import BookDetails from './components/BookDetails';
import BookForm from './components/BookForm';
import BookUpdateForm from './components/UpdateBook';
import BorrowersList from './components/BorrowersList';
import BorrowerDetails from './components/BorrowerDetails';
import BorrowerForm from './components/BorrowerForm';
import BorrowerUpdateForm from './components/UpdateBorrower';
import BorrowReturnBook from './components/BorrowReturnBook';
import NavigateToBookDetail from './components/NavigateToBookDetail';
import NavigateToBorrowerDetail from './components/NavigateToBorrowerDetail';
import BookIdEntry from './components/BookIdEntry'; 
import BorrowerIdEntry from './components/BorrowerIdEntry';
import UpdateBorrower from './components/UpdateBorrower';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/books" className="nav-link">Books</NavLink>
          <NavLink to="/borrowers" className="nav-link">Borrowers</NavLink>
          <NavLink to="/borrow-return" className="nav-link">Borrow/Return</NavLink>
          <NavLink to="/navigate-book" className="nav-link">Go to Book Details</NavLink>
          <NavLink to="/navigate-borrower" className="nav-link">Go to Borrower Details</NavLink>
          <NavLink to="/books/new" className="nav-link">Add Book</NavLink>
          <NavLink to="/borrowers/new" className="nav-link">Add Borrower</NavLink>
          <NavLink to="/books/update" className="nav-link">Update Book</NavLink> 
          <NavLink to="/borrowers/update" className="nav-link">Update Borrower</NavLink> 
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/books/new" element={<BookForm />} />
          <Route path="/books/:id/edit" element={<BookUpdateForm />} />
          <Route path="/borrowers" element={<BorrowersList />} />
          <Route path="/borrowers/:id" element={<BorrowerDetails />} />
          <Route path="/borrowers/new" element={<BorrowerForm />} />
          <Route path="/borrowers/:id/edit" element={<BorrowerUpdateForm />} />
          <Route path="/borrow-return" element={<BorrowReturnBook />} />
          <Route path="/navigate-book" element={<NavigateToBookDetail />} />
          <Route path="/navigate-borrower" element={<NavigateToBorrowerDetail />} />
          <Route path="/books/update" element={<BookIdEntry />} /> {/* New Route */}
          <Route path="/borrowers/update" element={<BorrowerIdEntry />} />
          <Route path="/borrowers/:id/edit" element={<UpdateBorrower />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
