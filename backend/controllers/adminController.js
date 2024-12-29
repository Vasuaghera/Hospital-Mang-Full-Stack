import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";

// Admin login
const loginAdmin = async (req, res) => {
    try {
        // Get email and password from request body
        const { email, password } = req.body
        // Check if email and password are correct
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } 
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } 
    // Catch error if any
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


// Get all Appointments for Admin 
const appointmentsAdmin = async (req, res) => {
    try {
        // Get all appointments from appointmentModel
        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })

    } 
    // Catch error if any
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// Appointment Cancellation
const appointmentCancel = async (req, res) => {
    try {
        // Get AppointmentId from request body
        const { appointmentId } = req.body
        // Update appointment with cancelled status
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
        res.json({ success: true, message: 'Appointment Cancelled' })

    } 
    // Catch error if any
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// Add Doctor
const addDoctor = async (req, res) => {

    try {
        // Get all details from request body
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file
        // Check if all details are provided
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "All details are required" })
        }
        // Check if email is valid
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid Email" })
        }
        // Check if password is strong
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong Password" })
        }
        // Hashing Password
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt)
        // Image Upload
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            // Store address : [takes a JSON string of Address and converts it into a JavaScript object]
            address: JSON.parse(address),
            date: Date.now()
        }
        // Save New Doctor
        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        res.json({ success: true, message: 'Doctor Added' })

    }
    // Catch error if any
    catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Error in Add Doctor [In Catch]' })
    }
}

// All Doctors List
const allDoctors = async (req, res) => {
    try {
        // Get all doctor from model 
        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })

    } 
     // Catch error if any
     catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {
        // Find doctor , users and all apointments
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})
        // create dashData
        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse()
        }
        // Res with dashData
        res.json({ success: true, dashData })

    } 
    // Catch error if any
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Export All 
export {
    loginAdmin,
    appointmentsAdmin,
    appointmentCancel,
    addDoctor,
    allDoctors,
    adminDashboard
}