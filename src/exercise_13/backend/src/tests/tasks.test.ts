import request from "supertest";
import { app } from "../server";
import { sequelize } from "../db/config";
import { Task } from "../models/Task.model";

describe("/tasks API", () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    beforeEach(async () => {
        await Task.destroy({ where: {} });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    test("GET /tasks returns empty list", async () => {
        const res = await request(app).get("/tasks");
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    test("POST /tasks creates task (201)", async () => {
        const res = await request(app).post("/tasks").send({
            title: "Task 1",
            description: "Desc",
            status: "todo",
            priority: "medium"
        });

        expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.title).toBe("Task 1");
    });

    test("POST /tasks returns 400 on invalid body", async () => {
        const res = await request(app).post("/tasks").send({
            description: "No title",
            status: "todo",
            priority: "medium"
        });

        expect(res.status).toBe(400);
    });

    test("GET /tasks/:id returns 200", async () => {
        const created = await request(app).post("/tasks").send({
            title: "Task 2",
            description: "Desc",
            status: "todo",
            priority: "medium"
        });

        const id = created.body.id;

        const res = await request(app).get(`/tasks/${id}`);

        expect(res.status).toBe(200);
        expect(res.body.id).toBe(id);
    });

    test("GET /tasks/:id returns 404 for unknown id", async () => {
        const res = await request(app).get("/tasks/99999");
        expect(res.status).toBe(404);
    });

    test("PUT /tasks/:id updates task", async () => {
        const created = await request(app).post("/tasks").send({
            title: "Task 3",
            description: "Desc",
            status: "todo",
            priority: "medium"
        });

        const id = created.body.id;

        const res = await request(app).put(`/tasks/${id}`).send({
            title: "Updated",
            status: "in_progress"
        });

        expect(res.status).toBe(200);
        expect(res.body.title).toBe("Updated");
        expect(res.body.status).toBe("in_progress");
    });

    test("PUT /tasks/:id returns 404 if not found", async () => {
        const res = await request(app).put("/tasks/99999").send({
            title: "Updated"
        });
        expect(res.status).toBe(404);
    });

    test("DELETE /tasks/:id returns 204", async () => {
        const created = await request(app).post("/tasks").send({
            title: "Delete me",
            description: "Desc",
            status: "todo",
            priority: "medium"
        });

        const id = created.body.id;

        const res = await request(app).delete(`/tasks/${id}`);
        expect(res.status).toBe(204);
    });

    test("DELETE /tasks/:id returns 404 if not found", async () => {
        const res = await request(app).delete("/tasks/99999");
        expect(res.status).toBe(404);
    });
});
