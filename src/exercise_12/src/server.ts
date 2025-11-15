import express from "express";
import cors from "cors";
import morgan from "morgan";

import { sequelize } from "./db/config.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/tasks", taskRoutes);

const port = 3000;

async function startServer() {
    await sequelize.sync();
    console.log("DB synced");

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

startServer();

export { app };
