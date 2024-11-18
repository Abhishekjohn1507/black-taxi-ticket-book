const RideDetails = ({ pickup, drop, fare }) => (
    <div>
      <h2>Ride Summary</h2>
      <p><strong>From:</strong> {pickup}</p>
      <p><strong>To:</strong> {drop}</p>
      <p><strong>Estimated Fare:</strong> ₹{fare}</p>
    </div>
  );
  