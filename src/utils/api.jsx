import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/api';

const BASE_URL = 'https://black-taxi-server.onrender.com/api'; // Replace this with your Render deployment URL

// const BASE_URL = 'https://nodejs-serverless-function-express-eight-pied.vercel.app/api'; // Replace this with your Render deployment URL

export const submitBooking = async (bookingData) => {
  try {
    const response = await axios.post(`${BASE_URL}/bookings`, bookingData);
    return response.data; // The response contains booking details
  } catch (error) {
    console.error('API Error:', error);
    throw error; // Throw error so it can be handled in the component
  }
};
