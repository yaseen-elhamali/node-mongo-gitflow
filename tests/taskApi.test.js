
import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import app from "../src/app.js";
import Task from "../src/models/Task.js";

// Test 1: Check the health endpoint
test("GET /health returns 200", async () => {
    const response = await request(app).get("/health");

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, { status: "ok" });
});

// Test 2: Check unknown routes
test("Unknown routes return 404", async () => {
    const response = await request(app).get("/unknown");

    assert.equal(response.status, 404);
});

// Test 3: Check the Task model
test("Task model has correct defaults", async () => {
    const task = new Task({ title: "Study Node.js" });

    assert.equal(task.title, "Study Node.js");
    assert.equal(task.completed, false);

    await task.validate();
});


// Test 4: Check required fields
test("Task requires a title", async () => {
    const task = new Task({});

    await assert.rejects(task.validate(), (error) => {
        assert.ok(error.errors.title);
        return true;
    });
});
// Test 5: Check invalid task IDs
test("Invalid task IDs return 400", async () => {
    const response = await request(app).get(
        "/api/tasks/invalid-id"
    );

    assert.equal(response.status, 400);
});
