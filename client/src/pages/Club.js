import React, { useState } from 'react';
import './Club.css'; // Import the CSS file

export const Club = () => {
  const [formData, setFormData] = useState({
    userName: '',
    phoneNo: '',
    otp: '',
    date: '',
  });
  const [isOTPRequested, setIsOTPRequested] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isDateValid = () => {
    const selectedDate = new Date(formData.date);
    const currentDate = new Date();

    // Remove the time part from both dates before comparison
    selectedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    // Check if the selected date is the current date or a future date
    return selectedDate >= currentDate;
  };

  const handleRequestOTP = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/bookings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: formData.userName,
          phoneNumber: formData.phoneNo,
          date: formData.date,
        }),
      });

      if (response.ok) {
        setIsOTPRequested(true);
       // alert('OTP requested. Please enter the OTP you receive.');
      } else {
        console.error('Error requesting OTP:', response.statusText);
      }
    } catch (error) {
      console.error('Error requesting OTP:', error.message);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/bookings/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: formData.phoneNo, enteredOTP: formData.otp }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsOTPVerified(true);
       // alert('OTP verified. You can now proceed.');
      } else {
        console.error('Error verifying OTP:', data.error);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOTPVerified) {
      // Submit logic for Club form
      // Implement submission logic as per your requirements
      //alert('Form submitted successfully!');
    } else {
      //alert('Please verify your OTP first!');
    }
  };

  return (
    <div className="clubFormContainer">
      <h2>Club Services</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Phone No:
          <input type="tel" name="phoneNo" value={formData.phoneNo} onChange={handleChange} />
        </label>
        <br />
        <label>
          Date:
          <input type="date" name="date" value={formData.date} onChange={handleChange} />
          {!isDateValid() && <span style={{ color: 'red' }}> Cannot select a previous date</span>}
        </label>
        {!isOTPRequested && (
          <button type="button" onClick={handleRequestOTP} disabled={!isDateValid()}>
            Request Club Access OTP
          </button>
        )}
        {isOTPRequested && !isOTPVerified && (
          <label>
            OTP:
            <input type="text" name="otp" value={formData.otp} onChange={handleChange} />
            <button type="button" onClick={handleVerifyOTP}>
              Verify OTP
            </button>
          </label>
        )}
        {isOTPVerified && <h3>Booked successfully</h3>}
      </form>
    </div>
  );
};

export default Club;
