import React from 'react';
import './Overview.css'; // Make sure the path is correct

export const Overview = () => {
  const imageStyle = {
    backgroundImage: `url("./images/Rootz.jpg")`, // Adjust the path based on your project structure

    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Adjust the height as needed
  };

  return (
    <div>
      <div className="parallax"></div> {/* Parallax window for the image */}

      {/* Carousel for automatic scrolling images */}

      <div className="overview-container">
        <h1>Welcome to ROOTZ</h1>
        <p className="overview-description">
          ROOTZ is a restobar located in the heart of Hubli. Our unique open garden restaurant offers an immersive dining experience, allowing guests to enjoy the beauty of nature while savoring our exquisite cuisine. Whether you're here for a casual meal or a special occasion, ROOTZ provides the perfect atmosphere to relax and indulge.
        </p>
      </div>
    </div>
  );
};

export default Overview;
