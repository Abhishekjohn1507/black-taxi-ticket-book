import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="container mt-5">
    <h1>Welcome to Ticket Booking</h1>
    <Link to="/book" className="btn btn-primary">Book Tickets</Link>
  </div>
);

export default HomePage;
