const express = require("express");
const router = express.Router();
const {  
    getBookings,
    createBookings,
    getBooking,
    deleteBooking,
    updateBooking,
    verifyOTP,
    createConfFine,
} = require("../controllers/bookingController");
const validationToken = require("../middleware/validateTokenHandler");
const { verify } = require("jsonwebtoken");

router.route("/").get(getBookings).post(createBookings); 
router.route("/verify-otp").post(verifyOTP); // Correct route for verifyOTP
router.route("/:id").put(validationToken,updateBooking);
router.route("/:id").get(getBooking).delete(deleteBooking); 

router.route("/hallfine").post(createConfFine); 


module.exports = router;