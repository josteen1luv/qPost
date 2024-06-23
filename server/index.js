const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorMiddleware = require("./middlewares/error-middleware");

require("dotenv").config();

const relations = require("./config/associations");
const db = require("./config/database");
const userRouter = require("./routers/user-router");
const postRouter = require("./routers/post-router");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', userRouter);
app.use('/api', postRouter);

// Error Middleware has to be the last one
app.use(errorMiddleware);

const start = async () => {
    try {
        relations();
        await db.sync({alter: true});
        app.listen(PORT, () => console.log(`Service started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start();