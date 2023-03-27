const express = require("express");
require("./Mongodb");
const User = require("./UserSchema.js");
const blog = require("./BlogsSchema.js");
const app = express();
const cors = require("cors");
app.use(express.json());

const port = 5000;
app.use(cors());
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  res.send(result);
});
app.get("/get", async (req, res) => {
  let data = await User.find();
  res.send(data);
});
app.put("/update/:id", async (req, res) => {
  let data = await User.updateOne(req.params, { $set: req.body });
  res.send(data);
});


// ###########Blogs collection##################


app.get("/getblogs", async (req, res) => {
  let data = await blog.find();
  res.send(data);
});

app.post("/addblogs", async (req, res) => {
  let user = new blog(req.body);
  let result = await user.save();
  res.send(result);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));