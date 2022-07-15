// Depedencies
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

// Development
app.use(express.json());
app.use(cors());
