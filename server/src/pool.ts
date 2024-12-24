import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI || "";

export const pool = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo DB");
    } catch (error) {
        console.log("Error Connecting to Mongo DB", error);
        process.exit(1);
    }
}