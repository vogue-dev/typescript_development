import express = require("express");
import morgan = require("morgan");
import cors = require("cors");

import taskRoutes from './routes/task.routes.js';
import { errorHandler } from './controllers/task.controller.js';

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/tasks', taskRoutes);

// 404
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// errors
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
