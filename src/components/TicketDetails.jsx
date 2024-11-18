import React from 'react';

const TicketDetails = ({ ticket }) => (
  <div>
    <h2>Ticket Details</h2>
    <p><strong>Name:</strong> {ticket.name}</p>
    <p><strong>Email:</strong> {ticket.email}</p>
    <p><strong>Date:</strong> {ticket.date}</p>
    <p><strong>Seats:</strong> {ticket.seats}</p>
  </div>
);

export default TicketDetails;
