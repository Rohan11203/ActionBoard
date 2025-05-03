import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import UserRouter from "./routes/user";
import mongoose from "mongoose";
import { TaskRouter } from "./routes/tasks";
import { Userauth } from "./auth/auth";


const app = express();
app.use(cors());
app.use(express.json());


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
