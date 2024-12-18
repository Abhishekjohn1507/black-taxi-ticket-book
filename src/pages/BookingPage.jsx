import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder, verifyPayment } from '../utils/api'; // Update API calls for Razorpay

const BookingPage = () => {
  const [formData, setFormData] = useState({
    Name: '',
    pickup: '',
    drop: '',
    date: '',
    time: '',
    passengers: 1,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePayment = async (orderId, amount) => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Use environment variable for Razorpay key ID
      amount: amount * 100, // Convert amount to paise
      currency: 'INR',
      name: 'BlackCab',
      description: 'Taxi Booking Payment',
      order_id: orderId, // Razorpay order ID
      handler: async (response) => {
        try {
          const paymentDetails = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          };

          const result = await verifyPayment(paymentDetails);

          if (result.success) {
            navigate('/confirmation', { state: { bookingDetails: result.booking } });
          } else {
            setError('Payment verification failed. Please try again.');
          }
        } catch (err) {
          setError('An error occurred while verifying the payment.');
          console.error(err);
        }
      },
      prefill: {
        name: formData.Name,
        email: 'user@example.com', // Optional: Replace with the user's email
        contact: '9999999999', // Optional: Replace with the user's contact number
      },
      theme: {
        color: '#007bff',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create an order on the server
      const result = await createOrder({ ...formData, amount: 500 }); // Example amount: ₹500
      setLoading(false);

      // Initiate payment
      await handlePayment(result.orderId, result.amount);
    } catch (err) {
      setLoading(false);
      console.error('Error during booking:', err);
      if (err.response) {
        setError(err.response.data.message || 'Booking failed.');
      } else if (err.request) {
        setError('Network error: Please check your internet connection.');
      } else {
        setError('Unexpected error occurred. Please try again.');
      }
    }
  };

  // Styles remain unchanged
  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '30px',
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

  const formGroupStyle = {
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    fontWeight: '500',
    color: '#495057',
    marginBottom: '8px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
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

  const errorStyle = {
    color: 'red',
    textAlign: 'center',
    fontSize: '1rem',
    marginBottom: '20px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Book Your Ride</h2>
      {error && <p style={errorStyle}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Name</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Pickup Location</label>
          <input
            type="text"
            name="pickup"
            value={formData.pickup}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Drop Location</label>
          <input
            type="text"
            name="drop"
            value={formData.drop}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Passengers</label>
          <input
            type="number"
            name="passengers"
            value={formData.passengers}
            onChange={handleChange}
            style={inputStyle}
            min="1"
            required
          />
        </div>
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Book Now'}
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
