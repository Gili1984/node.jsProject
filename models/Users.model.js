const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
   
      type: String,
      required: [true, "first name is requred"],


  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date_created: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const User = model("User", userSchema);
module.exports.User = User;