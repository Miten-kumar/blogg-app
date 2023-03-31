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
const multer  = require('multer')

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

app.post("/login", async (req, res) => {
  if (req.body.username && req.body.password) {
    let user = await User.findOne(req.body);
    if (user) {
      jwt.sign({ user }, jwtkey, { expiresIn: "4h" }, (err, token) => {
        if (err) {
          res.send({ result: "somthing went wrong" });
        }
        res.send({ user, auth: token });
      });
    } else {
      // res.send({ result: "check valide field" });
      res.status(401).send({ result: "Please provide valid details - " });
    }
  } else {
    res.status(403).send({ result: "Please filled first- " });
  }
});
app.get("/get", verifyToken, async (req, res) => {
  let data = await User.find();
  res.send(data);
});
app.put("/update/:_id", verifyToken, async (req, res) => {
  let data = await User.updateOne(req.params, { $set: req.body });
  res.send(data);
});

// ###########Blogs collection##################

app.get("/getblogs", async (req, res) => {
  let data = await blog.find();
  res.send(data);
});
app.get("/getblogs/:_id", async (req, res) => {
  let data = await blog.findOne(req.params);
  res.send(data);
});
app.post("/addblogs",async (req, res) => {
  let user = new blog(req.body);
  let result = await user.save();
  res.send(result,req.file);
});

app.put("/updateblogs/:_id", verifyToken, async (req, res) => {
  let data = await blog.updateOne(req.params, { $set: req.body });
  res.send(data);
});
app.delete("/delete/:_id", verifyToken, async (req, res) => {
  let data = await blog.deleteOne(req.params);
  res.send(data);
});
app.get("/search/:key", verifyToken, async (req, res) => {
  let data = await blog.find({
    $or: [
      { name: { $regex: req.params.key } },
      { password: { $regex: req.params.key } },
      { email: { $regex: req.params.key } },
    ],
  });
  res.send(data);
});
function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    // console.log(token);
    jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Please provide valid token - " });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Please Add token with headers" });
  }
}

app.listen(port, () => console.log(`Database listening on port ${port}!`));
