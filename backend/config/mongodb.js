import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log("Database Ready to use"))
    await mongoose.connect(`${process.env.MONGODB_URl}`)

}

export default connectDB;
