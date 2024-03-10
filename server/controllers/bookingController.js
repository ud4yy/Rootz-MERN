const asyncHandler = require("express-async-handler");
const Booking = require("../models/bookingModel");

//@desc Get all bookings
//@route GET /api/bookings
//@access public

const getBookings = asyncHandler(async(req,res)=>{
    const bookings = await Booking.find();
    res.status(200).json(bookings);
});

//@desc create bookings
//@route POST /api/bookings
//@access public
/*
const createBookings = asyncHandler(async(req,res) => {
    console.log("The req body is", req.body);
    //for club
    if(!req.body.timeslot){

    let timeslot = "default";
    let serviceType = "club";
    let defaultStatus = "confirmed";
    const { userName, phoneNumber,  date } = req.body;
    if (!userName || !phoneNumber || !serviceType || !date) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const booking = await Booking.create({
        userName,
        phoneNumber,
        serviceType,
        date,
        timeslot,
        status: defaultStatus 
    });
    res.status(201).json(booking);
    }

    else{
        const { userName, phoneNumber, serviceType, date, timeslot } = req.body;
       
        if (!userName || !phoneNumber || !serviceType || !date) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }
        let Status = "pending";

        const booking = await Booking.create({
            userName,
            phoneNumber,
            serviceType,
            date,
            timeslot,
            status: Status 
        });
        res.status(201).json(booking);
    }
});
*/
/* OTP working
const createBookings = asyncHandler(async(req,res) => {
    const otpCache = new Map();

    console.log("The req body is", req.body);
    //for club
    if(!req.body.timeslot){

    let timeslot = "default";
    let serviceType = "club";
    let defaultStatus = "confirmed";
    const { userName, phoneNumber,  date } = req.body;
    if (!userName || !phoneNumber || !serviceType || !date) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    //OTP generation
    const generatedOTP = Math.floor(1000 + Math.random() * 9000);
    const twilio = require("twilio");
    const accountSid = "AC03d8964bc1c8b8590ee621ba2fd311f4";
    const authToken = "e42f1d18b19e343381492aafe2bfff86";
    const client = new twilio(accountSid, authToken);
    
    console.log("Generated OTP:", generatedOTP);

    try {
        await client.messages.create({
          body: `Your OTP for booking is: ${generatedOTP}`,
          from: '+15165888875', // Replace with your Twilio phone number
          to: phoneNumber,
        });
        console.log("OTP sent successfully");
      } catch (error) {
        console.error("Error sending OTP:", error);
        res.status(404).json({ error: "Error sending OTP" });
        return;
      }
    const enteredOTP = req.body.enteredOTP; 

    if (!enteredOTP || enteredOTP !== generatedOTP.toString()) {
        res.status(404);
        throw new Error("Invalid OTP");
    }

    const booking = await Booking.create({
        userName,
        phoneNumber,
        serviceType,
        date,
        timeslot,
        status: defaultStatus 
    });
    res.status(201).json(booking);
    }

    else{
        const { userName, phoneNumber, serviceType, date, timeslot } = req.body;
       
        if (!userName || !phoneNumber || !serviceType || !date) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }
        let Status = "pending";
        //OTP generation
        const generatedOTP = Math.floor(1000 + Math.random() * 9000);
        const twilio = require("twilio");
        const accountSid = "AC03d8964bc1c8b8590ee621ba2fd311f4";
        const authToken = "e42f1d18b19e343381492aafe2bfff86";
        const client = new twilio(accountSid, authToken);
        console.log("Generated OTP:", generatedOTP);

        try {
            await client.messages.create({
            body: `Your OTP for booking is: ${generatedOTP}`,
            from: "+15165888875", // Replace with your Twilio phone number
            to: phoneNumber,
        });
            console.log("OTP sent successfully");
      } 
      catch (error) {
        console.error("Error sending OTP:", error);
        res.status(500).json({ error: "Error sending OTP" });
        return;
        }
        const enteredOTP = req.body.enteredOTP; 

        if(!enteredOTP || enteredOTP !== generatedOTP.toString()){
            res.status(404);
            throw new Error("Invalid OTP");
        }
        const booking = await Booking.create({
            userName,
            phoneNumber,
            serviceType,
            date,
            timeslot,
            status: Status 
        });
        res.status(201).json(booking);
    }
});
*/
const otpCache = new Map();

const createBookings = asyncHandler(async(req,res) => {

    console.log("The req body is", req.body);
    //for club
    if(!req.body.timeslot){

    let timeslot = "default";
    let serviceType = "club";
    let defaultStatus = "confirmed";
    const { userName, phoneNumber,  date } = req.body;
    if (!userName || !phoneNumber || !serviceType || !date) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    //OTP generation
    const generatedOTP = Math.floor(1000 + Math.random() * 9000);
    const twilio = require("twilio");
    const accountSid = "AC03d8964bc1c8b8590ee621ba2fd311f4";
    const authToken = "0cb96defc64f1f8bb75478df6eff0dee";
    const client = new twilio(accountSid,authToken);
    otpCache.set(phoneNumber, generatedOTP);
    try {
        await client.messages.create({
        body: `Your OTP for booking service at ROOTZ is: ${generatedOTP} ENJOY!!!`,
        from: "+15165888875", // Replace with your Twilio phone number
        to: phoneNumber,
    });
        console.log("OTP sent successfully this is IF");
    } 
    catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Error sending OTP" });
    return;
    }
    console.log("Generated OTP:", generatedOTP);

    const booking = await Booking.create({
        userName,
        phoneNumber,
        serviceType,
        date,
        timeslot,
        status: defaultStatus 
    });
    console.log("OTP sent");
    res.status(201).json(booking);
    }

    else{
        const { userName, phoneNumber, serviceType, date, timeslot } = req.body;
       
        if (!userName || !phoneNumber || !serviceType || !date) {
            res.status(400);
            throw new Error("All fields are mandatory");
        }
        let Status = "pending";
        //OTP generation
        const generatedOTP = Math.floor(1000 + Math.random() * 9000);
        const twilio = require("twilio");
        const accountSid = "AC03d8964bc1c8b8590ee621ba2fd311f4";
        const authToken = "0cb96defc64f1f8bb75478df6eff0dee";
        const client = new twilio(accountSid,authToken);
        console.log("Generated OTP:", generatedOTP);

        otpCache.set(phoneNumber, generatedOTP);
        try {
            await client.messages.create({
            body: `Your OTP for booking is: ${generatedOTP}`,
            from: "+15165888875", // Replace with your Twilio phone number
            to: phoneNumber,
        });
            
      } 
      catch (error) {
        console.error("Error sending OTP:", error);
        res.status(404).json({ error: "Error sending OTP" });
        return;
        }
        console.log("it is here");
        const booking = await Booking.create({
            userName,
            phoneNumber,
            serviceType,
            date,
            timeslot,
            status: Status 
        });
        console.log('Sending response:', booking);
        try {
            res.status(201).json(booking);
          } catch (error) {
            console.error('Error sending JSON response:', error);
          }
    }
});

const createConfFine= asyncHandler(async(req,res) => {

    console.log("The req body is", req.body);
   

    let defaultStatus = "pending";
    const { userName, phoneNumber,  serviceType, date, timeslot } = req.body;
    if (!userName || !phoneNumber || !serviceType || !date) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    //OTP generation
    const generatedOTP = Math.floor(1000 + Math.random() * 9000);
    const twilio = require("twilio");
    const accountSid = "AC03d8964bc1c8b8590ee621ba2fd311f4";
    const authToken = "0cb96defc64f1f8bb75478df6eff0dee";
    const client = new twilio(accountSid,authToken);
    otpCache.set(phoneNumber,generatedOTP);
    try {
        await client.messages.create({
        body: `Your OTP for booking service at ROOTZ is: ${generatedOTP} ENJOY!!!`,
        from: "+15165888875", // Replace with your Twilio phone number
        to: phoneNumber,
    });
        console.log("this is handling conf fine");
    } 
    catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Error sending OTP" });
    return;
    }
    console.log("Generated OTP:", generatedOTP);

    const booking = await Booking.create({
        userName,
        phoneNumber,
        serviceType,
        date,
        timeslot,
        status: defaultStatus 
    });
    console.log("OTP sent");
    res.status(201).json(booking);
    }
);
//OTP verification

const deleteComponentByPhoneNumber = async (phoneNumber) => {
    try {
      // Find and delete the booking with the provided phone number
      const deletedBooking = await Booking.findOneAndDelete({ phoneNumber: phoneNumber });
  
      if (!deletedBooking) {
        throw new Error("Booking not found");
      }
  
      console.log(`Booking deleted: ${deletedBooking._id}`);
      // You can log or handle the deletion result as needed
    } catch (error) {
      console.error("Error deleting booking:", error.message);
      throw error; // Propagate the error for further handling
    }
  }

const verifyOTP = asyncHandler(async(req,res)=>{
    const { phoneNumber, enteredOTP } = req.body;
    // Retrieve the generated OTP from the cache
    console.log(req.body);
    const generatedOTP = otpCache.get(phoneNumber);

    if (!generatedOTP || enteredOTP !== generatedOTP.toString()) {
        // If OTP is not valid, delete the component with the provided phone number
        try {
          await deleteComponentByPhoneNumber(phoneNumber);
          res.status(401).json({ error: "Invalid OTP, component deleted" });
        } catch (error) {
          res.status(500).json({ error: "Error deleting component" });
        }
        return;
      }
      otpCache.delete(phoneNumber);
      res.status(200).json({ message: "OTP verified successfully"});
});

//@desc get booking
//@route GET /api/bookings/:id
//@access public

const getBooking = asyncHandler(async(req,res)=>{
    const booking  = await Booking.findById(req.params.id);

    if(!booking){
        res.status(404);
        throw new Error("Not Found");
    }
    res.status(200).json(booking);
});

//@desc update bookings
//@route PUT /api/bookings/:id
//@access public

const updateBooking = asyncHandler(async(req,res)=>{
    const booking  = await Booking.findById(req.params.id);
    console.log("inside updatebooking");
    if(!booking){
        res.status(404);
        throw new Error("Not Found");
    }
    const updatedContact = await Booking.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );

    res.status(200).json(updatedContact);
});

//@desc delete booking
//@route DELETE /api/bookings/id
//@access public

const deleteBooking = asyncHandler(async(req,res)=>{
    const booking  = await Booking.findById(req.params.id);
    if(!booking){
        res.status(404);
        throw new Error("Not Found");
    }
    const deletedBooking  = await Booking.findByIdAndDelete(req.params.id);

    //await Booking.remove();
    res.status(200).json(booking);
});


module.exports ={
    getBookings,
    createBookings,
    getBooking,
    deleteBooking,
    updateBooking,
    verifyOTP,
    createConfFine,
};

/*
const getBookings = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});
*/
