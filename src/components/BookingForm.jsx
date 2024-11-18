import React, { useState } from 'react';

const BookingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    seats: 1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Add a loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading state
    onSubmit(formData)
      .finally(() => setIsSubmitting(false)); // Stop loading once done
  };

  const formContainerStyle = {
    maxWidth: '600px',
    margin: '30px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle = {
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: '20px',
  };

  const labelStyle = {
    fontWeight: '500',
    color: '#495057',
    marginBottom: '5px',
  };

  const inputStyle = {
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
  };

  const inputFocusStyle = {
    borderColor: '#007bff',
    boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '1.1rem',
    backgroundColor: '#007bff',
    border: 'none',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  const mb3Style = {
    marginBottom: '15px',
  };

  return (
    <div style={formContainerStyle}>
      <h2 style={titleStyle}>Book Your Ride</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <div style={mb3Style}>
          <label style={labelStyle}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => e.target.style = { ...inputStyle, ...inputFocusStyle }}
            onBlur={(e) => e.target.style = inputStyle}
            aria-label="Full Name"
          />
        </div>

        <div style={mb3Style}>
          <label style={labelStyle}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => e.target.style = { ...inputStyle, ...inputFocusStyle }}
            onBlur={(e) => e.target.style = inputStyle}
            aria-label="Email Address"
          />
        </div>

        <div style={mb3Style}>
          <label style={labelStyle}>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={(e) => e.target.style = { ...inputStyle, ...inputFocusStyle }}
            onBlur={(e) => e.target.style = inputStyle}
            aria-label="Date of Booking"
          />
        </div>

        <div style={mb3Style}>
          <label style={labelStyle}>Seats:</label>
          <input
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            min="1"
            required
            style={inputStyle}
            onFocus={(e) => e.target.style = { ...inputStyle, ...inputFocusStyle }}
            onBlur={(e) => e.target.style = inputStyle}
            aria-label="Number of Seats"
          />
        </div>

        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
          disabled={isSubmitting} // Disable button while submitting
        >
          {isSubmitting ? 'Booking...' : 'Book Now'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
