require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { apiRouter } = require("./routes");
const { dbconnection } = require("./config/dbConnection");
const cookieParser = require("cookie-parser");
const app = express();
const port = 5000;

app.use(
  cors({
    credentials: true,
    origin: "https://sample-frontend-mu.vercel.app", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api", apiRouter);

// database connection
dbconnection();

// Created server
app.listen(port, () => {
  console.log(`The server running on port: ${port}`);
});
