import React, { useEffect, useState } from 'react';
import './booklist.css'; // Import the CSS file where you define the styles

export const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [updatedStatusMap, setUpdatedStatusMap] = useState({});
  const [statusOptions] = useState(['pending', 'confirmed']);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/bookings');
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          console.error('Error fetching bookings:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error.message);
      }
    };

    fetchBookings();
  }, []);

  const handleUpdateStatus = async (bookingId) => {
    const accessToken = localStorage.getItem('accessToken');

    // Make a PUT request to update the status
    const response = await fetch(`http://localhost:5001/api/bookings/${bookingId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // Include Bearer token in Authorization header
      },
      body: JSON.stringify({
        status: updatedStatusMap[bookingId] || '', // Use the status from the map
      }),
    });

    // Check if the request was successful
    if (response.ok) {
      // Update the local state with the updated status
      const updatedBookings = bookings.map((booking) =>
        booking._id === bookingId ? { ...booking, status: updatedStatusMap[bookingId] || '' } : booking
      );
      setBookings(updatedBookings);
      setUpdatedStatusMap((prevStatusMap) => ({
        ...prevStatusMap,
        [bookingId]: '', // Reset status for the updated booking
      }));
    } else {
      // Handle error cases
      const errorData = await response.json();
      console.error('Error updating status:', errorData.message);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    const accessToken = localStorage.getItem('accessToken');

    // Make a DELETE request to delete the booking
    const response = await fetch(`http://localhost:5001/api/bookings/${bookingId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`, // Include Bearer token in Authorization header
      },
    });

    // Check if the request was successful
    if (response.ok) {
      // Filter out the deleted booking from the local state
      const filteredBookings = bookings.filter((booking) => booking._id !== bookingId);
      setBookings(filteredBookings);
    } else {
      // Handle error cases
      const errorData = await response.json();
      console.error('Error deleting booking:', errorData.message);
    }
  };

  return (
    <div className="bookings-list-container">
      <h2>Bookings List</h2>
      <table className="bookings-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Phone Number</th>
            <th>Time Slot</th>
            <th>Service Type</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.userName}</td>
              <td>{booking.phoneNumber}</td>
              <td>{booking.timeslot}</td>
              <td>{booking.serviceType}</td>
              <td>{booking.status}</td>
              <td>{new Date(booking.date).toLocaleDateString()}</td>
              <td>
                <select
                  className="status-select"
                  value={updatedStatusMap[booking._id] || ''}
                  onChange={(e) =>
                    setUpdatedStatusMap({
                      ...updatedStatusMap,
                      [booking._id]: e.target.value,
                    })
                  }
                >
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <button
                  className="update-status-button"
                  onClick={() => handleUpdateStatus(booking._id)}
                >
                  Update Status
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteBooking(booking._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsList;
