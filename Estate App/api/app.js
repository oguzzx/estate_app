import express from "express";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// import prisma from './lib/prisma.js';
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// connect to db
const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB bağlantısı başarılı");
  } catch (error) {
    throw error;
  }
};

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/users", userRoute);

app.listen(8800, () => {
  connect();
  console.log("Server is running on port 8800");
});
