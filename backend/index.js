//! create an express server and check if it's working

import express from "express";
import cors from "cors"; // cross origin resource sharing (browser blocks the request which comes from anywhere but localhost:8000)
// 1) we are importing express module which we installed using npm i

import userRoutes from "./routes/auth-route.js";
import questionRoutes from "./routes/question-route.js";
import sessionRoutes from "./routes/session-route.js";
import { connectDB } from "./config/database-config.js";
import dotenv from "dotenv";

dotenv.config();

// 2) call/invoke the function
let app = express(); // object = {listen}

// Connect to Database
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/api/auth", userRoutes); // http://localhost:9001/api/auth/signup
app.use("/api/questions", questionRoutes);
app.use("/api/sessions", sessionRoutes);

// 3) assign a port number to our server
app.listen(9001, () => {
  console.log("Server Started.....");
});
// app.listen(PORT_NUMBER, callback)

//! to check if the server is running, in cmd(git bash), goto backend folder and type "npx nodemon index.js"
// open browser -> localhost:PORT_NUMBER and press enter

// https://nodejs.org/en/ (/) =>  this is base url
// https://nodejs.org/en/blog => /blog is one endpoint
// https://nodejs.org/en/download

// https://github.com/Sarvesh-1999/NIGHT-CODING-MARATHON