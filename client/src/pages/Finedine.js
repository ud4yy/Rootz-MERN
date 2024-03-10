import React, { useState } from 'react';
import './finedine.css';

export const FineDine = () => {
  const [formData, setFormData] = useState({
    userName: '',
    phoneNo: '',
    otp: '',
    date: '',
    serviceType: 'default',
    timeSlot: '',
  });
  const [isOTPRequested, setIsOTPRequested] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRequestOTP = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: formData.userName,
          phoneNumber: formData.phoneNo,
          serviceType: 'finedine',
          date: formData.date,
          timeslot: formData.timeSlot,
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

  const isDateValid = () => {
    const selectedDate = new Date(formData.date);
    const currentDate = new Date();

    // Remove the time part from both dates before comparison
    selectedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    // Check if the selected date is the current date or a future date
    return selectedDate >= currentDate;
  };

  return (
    <div className="fineDineFormContainer">
      <h2>Fine Dine</h2>
      <form>
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
        <br />
        <label>
          Time Slot:
          <input type="time" name="timeSlot" value={formData.timeSlot} onChange={handleChange} />
        </label>
        <br />
        {!isOTPRequested && (
          <button
            type="button"
            onClick={handleRequestOTP}
            disabled={!isDateValid()} // Disable the button if the date is not valid
          >
            Generate OTP
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
        {isOTPVerified && <h3>Successfully booked</h3>}
      </form>
    </div>
  );
};

export default FineDine;
