"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../server");
const config_1 = require("../db/config");
const Task_model_1 = require("../models/Task.model");
describe("/tasks.ts API", () => {
    beforeAll(async () => {
        await config_1.sequelize.sync({ force: true });
    });
    beforeEach(async () => {
        await Task_model_1.Task.destroy({ where: {} });
    });
    afterAll(async () => {
        await config_1.sequelize.close();
    });
    test("GET /tasks.ts returns empty list", async () => {
        const res = await (0, supertest_1.default)(server_1.app).get("/tasks");
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });
    test("POST /tasks.ts creates task (201)", async () => {
        const res = await (0, supertest_1.default)(server_1.app).post("/tasks").send({
            title: "Task 1",
            description: "Desc",
            status: "todo",
            priority: "medium"
        });
        expect(res.status).toBe(201);
        expect(res.body.id).toBeDefined();
        expect(res.body.title).toBe("Task 1");
    });
    test("POST /tasks.ts returns 400 on invalid body", async () => {
        const res = await (0, supertest_1.default)(server_1.app).post("/tasks").send({
            description: "No title",
            status: "todo",
            priority: "medium"
        });
        expect(res.status).toBe(400);
    });
    test("GET /tasks.ts/:id returns 200", async () => {
        const created = await (0, supertest_1.default)(server_1.app).post("/tasks").send({
            title: "Task 2",
            description: "Desc",
            status: "todo",
            priority: "medium"
        });
        const id = created.body.id;
        const res = await (0, supertest_1.default)(server_1.app).get(`/tasks/${id}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(id);
    });
    test("GET /tasks.ts/:id returns 404 for unknown id", async () => {
        const res = await (0, supertest_1.default)(server_1.app).get("/tasks/99999");
        expect(res.status).toBe(404);
    });
    test("PUT /tasks.ts/:id updates task", async () => {
        const created = await (0, supertest_1.default)(server_1.app).post("/tasks").send({
            title: "Task 3",
            description: "Desc",
            status: "todo",
            priority: "medium"
        });
        const id = created.body.id;
        const res = await (0, supertest_1.default)(server_1.app).put(`/tasks/${id}`).send({
            title: "Updated",
            status: "in_progress"
        });
        expect(res.status).toBe(200);
        expect(res.body.title).toBe("Updated");
        expect(res.body.status).toBe("in_progress");
    });
    test("PUT /tasks.ts/:id returns 404 if not found", async () => {
        const res = await (0, supertest_1.default)(server_1.app).put("/tasks/99999").send({
            title: "Updated"
        });
        expect(res.status).toBe(404);
    });
    test("DELETE /tasks.ts/:id returns 204", async () => {
        const created = await (0, supertest_1.default)(server_1.app).post("/tasks").send({
            title: "Delete me",
            description: "Desc",
            status: "todo",
            priority: "medium"
        });
        const id = created.body.id;
        const res = await (0, supertest_1.default)(server_1.app).delete(`/tasks/${id}`);
        expect(res.status).toBe(204);
    });
    test("DELETE /tasks.ts/:id returns 404 if not found", async () => {
        const res = await (0, supertest_1.default)(server_1.app).delete("/tasks/99999");
        expect(res.status).toBe(404);
    });
});
