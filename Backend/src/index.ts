import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import UserRouter from "./routes/user";
import mongoose from "mongoose";


const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", UserRouter);

app.get("/", (req, res) => {
  console.log("hoi");
  res.json({
    message: "Fukc You",
  });
});

const MongoUrl1 = process.env.MongoUrl!

async function Main() {

  await  mongoose.connect(MongoUrl1);
  console.log('Connected to MongoDB');

  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
}

Main();
