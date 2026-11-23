
import express from "express";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

// Parse incoming JSON requests
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

// Task API routes
app.use("/api/tasks", taskRoutes);

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Centralized error handling
app.use((err, req, res, next) => {
    if (err.name === "ValidationError" ||
        err.name === "CastError" ||
        err.status === 400) {
        return res.status(400).json({
            message: err.message,
        });
    }

    console.error(err);
    res.status(500).json({
        message: "Internal server error",
    });
});

export default app;
