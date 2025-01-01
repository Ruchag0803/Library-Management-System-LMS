# Library Management System
A full-stack web application for managing library books and borrower details. This project includes both a backend built with Django and a frontend using React.

## Features
1. Book Management: Add, update, view, and list books.
2. Borrower Management: Add, update, view, and list borrowers.
3. Borrow/Return Books: Manage book transactions, including borrowing and returning books.
4. Detailed Views: View specific details of a book or borrower by entering their ID.
   
## Technologies Used
1. Backend: Django (Python)
2. Frontend: React
3. Routing: React Router for frontend navigation
4. Database: SQLite (for development purposes)

## Setup Instructions
Follow the steps below to set up and run both the backend (Django) and frontend (React) locally.

1. Backend Setup (Django)
1) Clone the Repository:
  git clone https://github.com/yourusername/LibraryManagement.git
  cd LibraryManagement

2) Set up a Virtual Environment: (Optional but recommended for project isolation)
  python -m venv venv

3) Install Dependencies: Install the necessary packages using pip:
  pip install -r backend/requirements.txt

4)Database Setup: Run the Django migrations to set up the database:
  python manage.py migrate

5) Run the Django Development Server: Start the backend server to test if everything is working:
  python manage.py runserver

The Django backend should now be accessible at http://localhost:8000.

2. Frontend Setup (React)
   
1) Navigate to the React Project Directory:
  cd lmui

2) Install Node.js Dependencies: Install the necessary frontend dependencies with npm:
  npm install

3) Run the React Development Server: Start the frontend development server:
  npm start
The React frontend should now be accessible at http://localhost:3000.

3. Connecting Backend and Frontend
Ensure that your Django backend is running on http://localhost:8000 and the React frontend is running on http://localhost:3000.
The React frontend should make API calls to the Django backend to fetch data and update records.
