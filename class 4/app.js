const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

const userModel = require("./schema");

require("dotenv/config");

// middlewares
// allow body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect DB
const baseUri = process.env.MONGODB_CREDENTIAL;
mongoose.connect(baseUri);
mongoose.connection.on("connected", () => console.log("mongoDB connected"));
mongoose.connection.on("error", (error) => console.log(error));

app.post("/api/user", (req, res) => {
  // const userData = req.body;

  const userObj = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    email: req.body.email,
  };

  userModel.create(userObj, (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.send(data);
    }
  });
});

app.delete("/api/user", (req, res) => {
  userModel.deleteOne({ _id: req.body._id }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("user deleted succesfully!");
      res.send(`${req.body._id} has been deleted!`);
    }
  });
});

app.put("/api/user", (req, res) => {
  userModel.findOneAndUpdate(
    { _id: req.body._id },
    { first_name: "Salman" },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    }
  );
});

app.get("/api/user", (req, res) => {
  userModel.findOne({ _id: req.body._id }, (error, data) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      res.send(data);
      console.log(data);
    }
  });
});

app.listen(PORT, console.log(`server running on localhost:${PORT}`));
