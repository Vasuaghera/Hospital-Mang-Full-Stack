import mongoose from "mongoose";

// Create a schema for the doctor include [ name , email , password , image , speciality , degree , experience , about , available , fees , slots_booked , address , date ]
const doctorSchema = new mongoose.Schema({
    
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: {
        type: String, 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    },
    speciality: { 
        type: String, 
        required: true 
    },
    degree: { 
        type: String, 
        required: true 
    },
    experience: { 
        type: String, 
        required: true 
    },
    about: { 
        type: String, 
        required: true 
    },
    available: { 
        type: Boolean, 
        default: true 
    },
    fees: { 
        type: Number, 
        required: true 
    },
    slots_booked: { 
        type: Object, 
        default: {} 
    },
    address: { 
        type: Object, 
        required: true 
    },
    date: { 
        type: Number, 
        required: true 
    },
}, { minimize: false })
// Use minimize for slots_booked: false to store empty objects in the database

const doctorModel = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);
export default doctorModel;