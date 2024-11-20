import axios from 'axios';

// Get the API URL from environment variables, fallback to localhost if not set
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create a Razorpay order
export const createOrder = async (amount) => {
  try {
    const response = await axios.post(`${BASE_URL}/create-order`, { amount });
    return response.data; // { orderId, key }
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

// Verify the Razorpay payment
export const verifyPayment = async (paymentDetails) => {
  try {
    const response = await axios.post(`${BASE_URL}/verify-payment`, paymentDetails);
    return response.data; // { success, bookingId }
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

// Submit booking data
export const submitBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${BASE_URL}/bookings`, bookingData);
    return response.data; // Booking details
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
