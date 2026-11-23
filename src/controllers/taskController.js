
import mongoose from "mongoose";
import Task from "../models/Task.js";

// GET /api/tasks
export async function getAllTasks(req, res) {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
}

// GET /api/tasks/:id
export async function getTaskById(req, res) {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
}

// POST /api/tasks
export async function createTask(req, res) {
    const task = await Task.create(req.body);
    res.status(201).json(task);
}

// PUT /api/tasks/:id
export async function updateTask(req, res) {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { returnDocument: "after", runValidators: true }
    );

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
}

// DELETE /api/tasks/:id
export async function deleteTask(req, res) {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.status(204).send();
}
