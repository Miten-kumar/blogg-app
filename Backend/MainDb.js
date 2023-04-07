const express = require("express");
require("./Mongodb");
const User = require("./UserSchema.js");
const blog = require("./BlogsSchema.js");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const jwtkey = "user";
const port = 5000;
const multer = require("multer");
const path = require("path");
var fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

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

app.get("/getblog/:userId", async (req, res) => {
  let data = await blog.find({ userId: req.params.userId });
  res.send(data);
});

app.post("/addblogs", upload.single("image"), async (req, res) => {
  // console.log(req.body);

  const image = fs.readFileSync(
    path.join(__dirname + "/uploads/" + req.file.filename)
  );
  var folder = "./uploads/";
  fs.readdir(folder, (err, files) => {
    for (const file of files) {
      fs.unlinkSync(folder + file);
    }
  });
  try {
    blog.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      userId: req.body.userId,
      image: image,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ Status: "error", data: error });
  }
});

app.put("/updateblogs/:_id", verifyToken, async (req, res) => {
  let data = await blog.updateOne(req.params, { $set: req.body });
  res.send(data);
});
app.delete("/delete/:_id", verifyToken, async (req, res) => {
  let data = await blog.deleteOne(req.params);
  res.send(data);
});
app.get("/search/:userId/:key",verifyToken, async (req, res) => {
  let data = await blog.find({
    userId: req.params.userId,
    $or: [
      { name: { $regex: req.params.key } },
      { password: { $regex: req.params.key } },
      { email: { $regex: req.params.key } },
    ],
  });
  res.send(data);
});


app.get("/searchall/:key", verifyToken, async (req, res) => {
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

app.post("/forgotPassword", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;
  console.log(email);
  try {
    const oldUser = await User.find({ email });
    console.log(oldUser);
    if (!oldUser) {
      res.send("error")
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = jwtkey + oldUser[0].password;
    const token = jwt.sign({ email: oldUser[0].email, id: oldUser[0]._id }, secret, {
      expiresIn: "4h",
    });
    const olduserId=oldUser[0]._id;
    const link = `http://localhost:5000/reset-password/${olduserId}/${token}`;
   console.log(link);
   res.send("ok ")
  } catch (error) { }
});







app.listen(port, () => console.log(`Database listening on port ${port}!`));
