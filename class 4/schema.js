const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
