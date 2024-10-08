require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { apiRouter } = require("./routes");
const { dbconnection } = require("./config/dbConnection");
const cookieParser = require("cookie-parser");
const app = express();
const port = 5000;

app.use(function (req, res, next) {
  req.setTimeout(5000); // Set request timeout to 5 seconds (5000 ms)
  next();
});

app.use(
  cors({
    credentials: true,
    origin: "https://sample-frontend-mu.vercel.app/", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());
app.use(cookieParser());

// database connection
dbconnection();

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/api", apiRouter);



// Created server
app.listen(port, () => {
  console.log(`The server running on port: ${port}`);
});
