const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  id:Number,
  email: String,
  role: String,
  createdTime:{
    type:Date,
    default:Date.now()
  }
});
module.exports= mongoose.model("users",userSchema)