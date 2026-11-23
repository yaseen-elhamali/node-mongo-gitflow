
import app from "./app.js";
import { config } from "./config/env.js";
import { connectDatabase } from "./config/database.js";

async function startServer() {
    try {
        await connectDatabase();

        app.listen(config.port, () => {
            console.log(
                `Server running in ${config.environment} on port ${config.port}`
            );
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exitCode = 1;
    }
}

startServer();
