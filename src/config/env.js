
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Available environments
const allowedEnvironments = ["staging", "preprod", "prod"];

// Use staging by default
const environment = process.env.APP_ENV || "staging";

// Check the environment name
if (!allowedEnvironments.includes(environment)) {
    throw new Error(`Invalid environment: ${environment}`);
}

// Find the project's root directory
const rootDir = fileURLToPath(new URL("../../", import.meta.url));

// Select the appropriate .env file
const envPath = path.join(rootDir, `.env.${environment}`);

// Load environment variables dynamically
const result = dotenv.config({ path: envPath, quiet: true });

if (result.error) {
    throw new Error(`Cannot load configuration: ${envPath}`);
}

// Validate required variables
if (!process.env.PORT || !process.env.MONGO_URI) {
    throw new Error("Missing required environment variables");
}

// Export configuration
export const config = {
    environment,
    port: Number(process.env.PORT),
    mongoUri: process.env.MONGO_URI,
};

if (!Number.isInteger(config.port) ||
    config.port < 1 ||
    config.port > 65535) {
    throw new Error("Invalid PORT value");
}
