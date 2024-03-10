import React, { useState } from 'react';
import './manage.css';
export const Manage = () => {
  const [formData, setFormData] = useState({
    bookingId: '',
  });
  const [bookingInfo, setBookingInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5001/api/bookings/${formData.bookingId}`);
      if (response.ok) {
        const data = await response.json();
        setBookingInfo(data);
        
        setError(null);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || 'Error fetching booking information');
        setBookingInfo(null);
      }
    } catch (error) {
      console.error('Error:', error);
      //alert("BID Invalid");
      setError('Error fetching booking information');
      setBookingInfo(null);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/bookings/${formData.bookingId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
       // alert("Booking Cancelled");
        setBookingInfo(null);
        setError(null);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || 'Error deleting booking');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error deleting booking');
    }
  };

  return (
    <div className="ManageBooking">
      <h2>Manage Booking</h2>
      <form onSubmit={handleSearch}>
        <label>
          Booking ID:
          <input type="text" name="bookingId" value={formData.bookingId} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Search Booking</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {bookingInfo && (
        <div>
          <h3>Booking Information:</h3>
          <p>Customer Name: {bookingInfo.userName}</p>
          {/* Add other booking information here */}
          <button onClick={handleDelete}>Delete Booking</button>
        </div>
      )}
    </div>
  );
};

export default Manage;
