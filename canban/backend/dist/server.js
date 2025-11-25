"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const task_controller_1 = require("./controllers/task.controller");
const config_1 = require("./db/config");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use((0, morgan_1.default)("dev"));
exports.app.use(express_1.default.json());
exports.app.use("/tasks", task_routes_1.default);
exports.app.use(task_controller_1.errorHandler);
if (process.env.NODE_ENV !== "test") {
    const port = process.env.PORT || 3000;
    config_1.sequelize
        .sync()
        .then(() => {
        exports.app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
        .catch((err) => {
        console.error("DB connection error:", err);
        process.exit(1);
    });
}
