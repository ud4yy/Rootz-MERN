const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {

    userName: {
      type: String,
      required: [true, "Please add the username"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please add a phone number"],
    },
    serviceType: {
      type: String,
      required: true,
      enum: ["finedine", "club", "conference hall"], // Ensures the value is one of these options
    },
    date: {
      type: Date,
      required: [true, "Please add a date for the booking"],
    },
    timeslot: {
      type: String, // Can be adjusted based on how you want to handle timeslots // For club and conference hall, or when not specified for fine dining
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "confirmed", "cancelled"], // Example statuses
     
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
