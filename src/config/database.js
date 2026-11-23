
import mongoose from "mongoose";
import { config } from "./env.js";

// Connect to MongoDB using the selected environment
export async function connectDatabase() {
    try {
        await mongoose.connect(config.mongoUri, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log(`MongoDB connected: ${config.environment}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        throw error;
    }
}
