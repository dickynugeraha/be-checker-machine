// Depedencies
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const authRoute = require("./routes/Auth");
const adminRoute = require("./routes/Admin");

// Development
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Controll-Allow-Methods",
    "PUT, GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Controll-Allow-Headers",
    "application/json, Authorization"
  );
  next();
});

mongoose.connect(
  "mongodb+srv://dbCheckMachine:123QwE@cluster0.j3a2nhh.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use("/auth", authRoute);
app.use("/admin", adminRoute);

app.listen(3001, () => {
  console.log("Port running on 3001");
});
