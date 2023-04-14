const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  userId: {
    type: ObjectId,

    ref: "users",
  },
  id: Number,
  image: String,
  createdTime: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("blogs", userSchema);
