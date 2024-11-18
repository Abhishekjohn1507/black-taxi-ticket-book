import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react'; // Import QRCodeCanvas
import './ConfirmationPage.css'; // External CSS for styles

const ConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const bookingDetails = state?.bookingDetails;

  const [isPrinted, setIsPrinted] = useState(false);
  const [uniqueId, setUniqueId] = useState(null); // State to store unique ID

  // Function to format date
  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // Function to generate and store a unique ID for the order
  const generateUniqueId = () => {
    const storedUniqueId = localStorage.getItem('uniqueOrderId');
    if (storedUniqueId) {
      return storedUniqueId;
    } else {
      const newUniqueId = 'id_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('uniqueOrderId', newUniqueId);
      return newUniqueId;
    }
  };

  useEffect(() => {
    if (!bookingDetails) {
      navigate('/'); // Redirect to the booking page if no booking details are found
      return;
    }

    const id = generateUniqueId();
    setUniqueId(id);
  }, [bookingDetails, navigate]);

  const handlePrint = () => {
    window.print();
    setIsPrinted(true); // Remove print button after print
  };

  // Ticket data to encode in the QR code, including the unique ID
  const ticketData = bookingDetails ? {
    bookingId: bookingDetails.id,
    uniqueId: uniqueId,
    passengerName: bookingDetails.Name, // Ensure you use 'Name' if that's correct
    pickup: bookingDetails.pickup,
    drop: bookingDetails.drop,
    date: formatDate(bookingDetails.date),
    fare: bookingDetails.fare,
  } : {};
console.log("sf",bookingDetails.Name)
  return (
    <div className="container">
      <div className="ticket">
        <div className="ticket-header text-center">
          <img src="/logo.png" alt="Black Cab Logo" className="ticket-logo" />
          <h2>Black Cab</h2>
          <p>Proof of Payment</p>
        </div>

        {bookingDetails ? (
          <div className="ticket-details">
            <div className="ticket-row">
  <span>Name:</span>
  <span>{bookingDetails.Name}</span> {/* Ensure it matches the API field */}
</div>

            <div className="ticket-row">
              <span>Booking ID:</span>
              <span>{uniqueId}</span>
            </div>
            <div className="ticket-row">
              <span>Unique ID:</span>
              <span>{uniqueId}</span>
            </div>
           

            <div className="ticket-row">
              <span>Pickup Location:</span>
              <span>{bookingDetails.pickup}</span>
            </div>
            <div className="ticket-row">
              <span>Destination:</span>
              <span>{bookingDetails.drop}</span>
            </div>
            <div className="ticket-row">
              <span>Pickup Time:</span>
              <span>{formatDate(bookingDetails.date)}</span>
            </div>
            <div className="ticket-row">
              <span>Fare:</span>
              <span>₹{600}</span>
            </div>
          </div>
        ) : (
          <p>No booking details found.</p>
        )}

        {/* QR Code for Ticket Details */}
        <div className="ticket-footer text-center">
          {ticketData.bookingId ? (
            <QRCodeCanvas value={JSON.stringify(ticketData)} size={128} />
          ) : (
            <p>Loading QR code...</p>
          )}
          <p>Scan for more details</p>
        </div>

        {/* Print Button */}
        {!isPrinted && (
          <div className="text-center">
            <button onClick={handlePrint} className="btn btn-primary">
              Print Ticket
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmationPage;
