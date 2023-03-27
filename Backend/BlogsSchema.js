const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  userId:Number,
  id: Number,
});
module.exports= mongoose.model("blogs",userSchema)