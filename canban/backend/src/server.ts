import express from "express";
import morgan from "morgan";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import { errorHandler } from "./controllers/task.controller";
import { sequelize } from "./db/config";

export const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/tasks", taskRoutes);

app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
    const port = process.env.PORT || 3000;

    sequelize
        .sync()
        .then(() => {
            app.listen(port, () => {
                console.log(`Server listening on port ${port}`);
            });
        })
        .catch((err) => {
            console.error("DB connection error:", err);
            process.exit(1);
        });
}
