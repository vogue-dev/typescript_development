import request from "supertest";
import { app } from "../server.js";
import { sequelize } from "../db/config.js";


beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe("TASKS API", () => {
    test("GET /tasks → 200", async () => {
        const res = await request(app).get("/tasks");
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("POST /tasks → 201", async () => {
        const res = await request(app)
            .post("/tasks")
            .send({
                title: "Test task",
                description: "desc",
                status: "todo",
                priority: "medium",
            });

        expect(res.status).toBe(201);
        expect(res.body.title).toBe("Test task");
    });
});
