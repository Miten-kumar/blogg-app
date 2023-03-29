const express = require("express");
require("./Mongodb");
const User = require("./UserSchema.js");
const blog = require("./BlogsSchema.js");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwtkey = "user";

const port = 5000;

app.use(express.json());

app.use(cors());
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  jwt.sign({ result }, jwtkey, { expiresIn: "4h" }, (err, token) => {
    if (err) {
      res.send({ result: "somthing went wrong" });
    }
    res.send({ result, auth: token });
  });
});

// app.get("/get", async (req, res) => {
  
//   if (req.body.username && req.body.password) {
//     let user = await User.findOne(req.body).select("-password");

//     if (user) {
//       jwt.sign({ user }, jwtkey, { expiresIn: "4h" }, (err, token) => {
//         if (err) {
//           res.send({ result: "somthing went wrong" });
//         }
//         res.send({ user, auth: token });
//       });
//     }
//   }
// });
app.get("/get", async (req, res) => {
  let data = await User.find();
  res.send(data);
});
app.put("/update/:_id", async (req, res) => {
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

app.put("/updateblogs/:_id", async (req, res) => {
  let data = await blog.updateOne(req.params, { $set: req.body });
  res.send(data);
});
app.delete("/delete/:_id", async (req, res) => {
  let data = await blog.deleteOne(req.params);
  res.send(data);
});
app.get("/search/:key", async (req, res) => {
  let data = await blog.find({
    $or: [
      { name: { $regex: req.params.key } },
      { password: { $regex: req.params.key } },
      { email: { $regex: req.params.key } },
    ],
  });
  res.send(data);
});

app.listen(port, () => console.log(`Database listening on port ${port}!`));
