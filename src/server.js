const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Booking API');
});

app.post('/api/bookings', (req, res) => {
  const { pickup, drop, date, time, passengers } = req.body;

  if (!pickup || !drop || !date || !time || !passengers) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const booking = {
    id: new Date().getTime(),
    pickup,
    drop,
    date,
    time,
    passengers,
  };

  res.status(201).json({
    message: 'Booking created successfully.',
    booking,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
