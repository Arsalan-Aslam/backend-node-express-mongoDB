const express = require("express");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
const UserModel = require("./schema");
require("dotenv/config");

const app = express();

// Body Allow
// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect DB

const baseUri = process.env.MONGODB_CREDENTIAL;
mongoose.connect(baseUri);
mongoose.connection.on("connected", () => console.log("mongoDB is connected"));
mongoose.connection.on("error", (error) => console.log("error", error));

// Signup API
app.post("/api/signup", (req, res) => {
  const body = req.body;
  const userObj = {
    first_name: body.firstName,
    last_name: body.lastName,
    gender: body.gender,
    role: body.role,
    email: body.email,
    password: body.password,
  };

  UserModel.create(userObj, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

// Login API
app.post("/api/login", (req, res) => {
  const userObj = {
    email: req.body.email,
    password: req.body.password,
  };

  UserModel.findOne(userObj, (error, data) => {
    if (error) {
      res.send(error);
    } else if (data) {
      res.send(data);
    } else {
      res.send("Invalid email or password");
    }
  });
});

// Single user (Params)
app.get("/api/user/:id", (req, res) => {
  const { id } = req.params;

  UserModel.findOne({ _id: id }, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

// All users

app.get("/api/user", (req, res) => {
  UserModel.find({}, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);
