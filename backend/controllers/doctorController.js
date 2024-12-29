import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

// Doctor login
const loginDoctor = async (req, res) => {

    try {
        // get email and pass
        const { email, password } = req.body
        // find user
        const user = await doctorModel.findOne({ email })
        // if not found
        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" })
        }
        // match pass
        const isMatch = await bcrypt.compare(password, user.password)
        // pass match then crate token and res with token
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } 
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Doctor appointment
const appointmentsDoctor = async (req, res) => {
    try {
        // get doc id
        const { docId } = req.body
        // find appointment from that id
        const appointments = await appointmentModel.find({ docId })
        // res that all appointment
        res.json({ success: true, appointments })

    } 
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Cancel appointment
const appointmentCancel = async (req, res) => {
    try {
        // get doc id and appointment id 
        const { docId, appointmentId } = req.body
        // get appointment data from that id
        const appointmentData = await appointmentModel.findById(appointmentId)
        // if that data is and doc id is same then cancelled it
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment Cancelled' })
        }
        res.json({ success: false, message: 'Appointment Cancelled' })

    } 
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// Appointment Complete
const appointmentComplete = async (req, res) => {
    try {
        // Get docid and appointment id
        const { docId, appointmentId } = req.body
        //  find appointment data from that id
        const appointmentData = await appointmentModel.findById(appointmentId)
         // if that data is and doc id is same then complete that
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment Completed' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } 
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// Doctor list
const doctorList = async (req, res) => {
    try {
        // get all doctor from model and remove pass and email and res that 
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })

    } 
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// Change doctor availability
const changeAvailablity = async (req, res) => {
    try {
        // get docid from req
        const { docId } = req.body
        // find that doc data
        const docData = await doctorModel.findById(docId)
        // and update that availability from id
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'Availablity Changed' })

    } 
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Doctor profile
const doctorProfile = async (req, res) => {
    try {
        // get docid from req
        const { docId } = req.body
        // find profile data of that doc
        const profileData = await doctorModel.findById(docId).select('-password')
        // res with that data
        res.json({ success: true, profileData })

    } 
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// update doctor profile
const updateDoctorProfile = async (req, res) => {
    try {
        // get docId, fees, address, available from req body
        const { docId, fees, address, available } = req.body
        // with the use of id update all other in model
        await doctorModel.findByIdAndUpdate(docId, { fees, address, available })
        // and send res
        res.json({ success: true, message: 'Profile Updated' })

    } 
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Doctor dashboard
const doctorDashboard = async (req, res) => {
    try {
        // get doc id from req body
        const { docId } = req.body
        // find appointment of that
        const appointments = await appointmentModel.find({ docId })
        // init earning
        let earnings = 0
        // find total earning
        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })
        // init patient
        let patients = []
        // find all patient
        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        // create dash dat and send with res
        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse()
        }

        res.json({ success: true, dashData })

    } 
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Export All 
export {
    loginDoctor,
    appointmentsDoctor,
    appointmentCancel,
    doctorList,
    changeAvailablity,
    appointmentComplete,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile
}