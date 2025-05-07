import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import cors from "cors";
import UserRouter from "./routes/user";
import mongoose from "mongoose";
import { TaskRouter } from "./routes/tasks";
import { Userauth } from "./auth/auth";


const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000","https://actionboard-o9g9.onrender.com"],  // your Next.js app
    credentials: true,                // allow cookie headers
  })
);
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/auth", UserRouter);
app.use("/api/v1/tasks",Userauth, TaskRouter)

const MongoUrl1 = process.env.MongoUrl!

async function Main() {

  await  mongoose.connect(MongoUrl1);
  console.log('Connected to MongoDB');

  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
}

Main();
