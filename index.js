// Depedencies
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

const authRoute = require("./routes/Auth");
const adminRoute = require("./routes/Admin");
const docMachineRoute = require("./routes/DocMachine");

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

// configure uploading
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().split(":")[0] + "_" + file.originalname.trim()
    );
  },
});
const filterImage = (req, file, cb) => {
  if (
    file.mimetype === "application/msword" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(
  multer({ fileFilter: filterImage, storage: fileStorage }).single("image")
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doc-machine", docMachineRoute);

app.listen(3001, () => {
  console.log("Port running on 3001");
});
