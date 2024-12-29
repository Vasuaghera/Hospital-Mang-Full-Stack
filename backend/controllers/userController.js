import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import { v2 as cloudinary } from 'cloudinary'
import stripe from "stripe";
import razorpay from 'razorpay';

// Gateway Initialize
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// Register user
const registerUser = async (req, res) => {

    try {
        // Get name , email and pass from body
        const { name, email, password } = req.body;

        // Check missing values
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
        const hashedPassword = await bcrypt.hash(password, salt)

        // create user data
        const userData = {
            name,
            email,
            password: hashedPassword,
        }
        
        // crate new user and save
        const newUser = new userModel(userData)
        const user = await newUser.save()
        // Generate token of that
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        // send res with token
        res.json({ success: true, token })

    } 
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// login user
const loginUser = async (req, res) => {

    try {
        // Get email and pass from req body
        const { email, password } = req.body;
        // find user with that email
        const user = await userModel.findOne({ email })
        // is not avib.
        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }
        // match pass
        const isMatch = await bcrypt.compare(password, user.password)
        // is match then create token and send with that
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } 
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Get user profile data
const getProfile = async (req, res) => {

    try {
        // get user id
        const { userId } = req.body
        // find user data from id
        const userData = await userModel.findById(userId).select('-password')
        // send res with that data
        res.json({ success: true, userData })

    } 
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Update user profile
const updateProfile = async (req, res) => {

    try {
        // Get all details from req body 
        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file
        // check missing values
        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }
        // find id and upadate all values of that user
        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
        // is imagefile available then upload to cloudinary and update with new url
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            const imageURL = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        res.json({ success: true, message: 'Profile Updated' })

    } 
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to book appointment 
const bookAppointment = async (req, res) => {

    try {
        // Get all details from req body
        const { userId, docId, slotDate, slotTime } = req.body
        // Get doc data
        const docData = await doctorModel.findById(docId).select("-password")
        // check if doc is available
        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor Not Available' })
        }
        // check if slot is available
        let slots_booked = docData.slots_booked
        // if slot is already booked 
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot Not Available' })
            }
            else {
                slots_booked[slotDate].push(slotTime)
            }
        }
        // if slot is not booked
        else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }
        // get user data
        const userData = await userModel.findById(userId).select("-password")
        // remove password from doc data
        delete docData.slots_booked
        // create appointment data
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }
        // save appointment data
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()
        // update doc data with new slots
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Booked' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        // get user id and appointment id
        const { userId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)
        // check if user is authorized to cancel
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: 'Unauthorized action' })
        }
        // cancel appointment
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
        // get doc data
        const { docId, slotDate, slotTime } = appointmentData
        // get doc data
        const doctorData = await doctorModel.findById(docId)
        
        let slots_booked = doctorData.slots_booked
        
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// list all appointments 
const listAppointment = async (req, res) => {
    try {
        // get user id
        const { userId } = req.body
        // find all appointments of that user
        const appointments = await appointmentModel.find({ userId })
        // send res with that data
        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// razorpay payment
const paymentRazorpay = async (req, res) => {
    try {   
        // get appointment id
        const { appointmentId } = req.body
        // get appointment data
        const appointmentData = await appointmentModel.findById(appointmentId)
        // check both conditions
        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: 'Appointment Cancelled or not found' })
        }
        // creating options for razorpay payment
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }
        // creation of an order
        const order = await razorpayInstance.orders.create(options)
        res.json({ success: true, order })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// verify payment of razorpay
const verifyRazorpay = async (req, res) => {
    try {
        // get razorpay order id
        const { razorpay_order_id } = req.body
        // get order info
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        // check if payment is successful
        if (orderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            res.json({ success: true, message: "Payment Successful" })
        }
        else {
            res.json({ success: false, message: 'Payment Failed' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// export all functions
export {
    loginUser,
    registerUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment,
    paymentRazorpay,
    verifyRazorpay
}