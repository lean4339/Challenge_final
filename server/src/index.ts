import express, { Express, Request, Response } from "express";
import cors from "cors";
import cookieParser from 'cookie-parser'
import dotenv from "dotenv";
dotenv.config();

import indexRouter from './routes/index.router'
import usersRouter from './routes/user.router'
import paymentRouter from './routes/payment.router'
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use(cookieParser());
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/payment',paymentRouter)
app.listen(port, () => {
	console.log("Server is running at http://localhost:", port);
});

export default app;