const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  id:Number,
  email: String,
  role: String,
});
module.exports= mongoose.model("users",userSchema)