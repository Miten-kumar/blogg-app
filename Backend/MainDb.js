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
var bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, file.originalname + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());
// app.use(express.static(path.join(__dirname, "src")));

app.use("/uploads", express.static("uploads"));

app.post("/register", async (req, res) => {
  // console.log(req.body);
  const secpass = await bcrypt.hash(req.body.password, 10);
  // console.log(secpass);
  try {
    const result = User.create({
      username: req.body.username,
      email: req.body.email,
      password: secpass,
      role: req.body.role,
    });
    jwt.sign({ result }, jwtkey, { expiresIn: "4h" }, (err, token) => {
      if (err) {
        res.send({ result: "somthing went wrong" });
      }
      res.send({ result, auth: token });
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ Status: "error", data: error });
  }
});

app.post("/login", async (req, res) => {
  if (req.body.username && req.body.password) {
    let user = await User.findOne({ username: req.body.username });
    // console.log(user);
    const password = await bcrypt.compare(req.body.password, user.password);
    // console.log(password);
    if (password) {
      let token = jwt.sign({ user }, jwtkey, { expiresIn: "15s" });
      let refreshToken = jwt.sign({ user }, "refreshToken", {
        expiresIn: "4h",
      });
      res.send({ user, auth: token, refreshToken: refreshToken });
    }
  } else {
    res.status(401).send({ result: "Please provide valid details - " });
  }
});
//Because of also Logout person can see blog author
app.get("/get", verifyToken, async (req, res) => {
  let data = await User.find();
  res.send(data);
});
app.put("/update/:_id", async (req, res) => {
  let data = await User.updateOne(req.params, { $set: req.body });
  res.send(data);
});

// ###########Blogs collection##################

app.get("/getblogs", async (req, res) => {
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 3;
  // console.log(page, limit);

  let skip = (page - 1) * limit;
  let blogs = await blog.find().skip(skip).limit(limit).populate("userId");
  // console.log(blogs);
  let totalpage = Math.ceil((await blog.find()).length / limit);
  res.send({ blogs, totalpage });

  // res.status(200).json({ data, nbHits: data.length });
});
app.get("/getblogs/:_id", async (req, res) => {
  let data = await blog.findOne(req.params);
  res.send(data);
});

app.get("/getblog/:userId", verifyToken, async (req, res) => {
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 3;
  // console.log(page, limit);

  let skip = (page - 1) * limit;
  let blogs = await blog
    .find({ userId: req.params.userId })
    .skip(skip)
    .limit(limit);
  // console.log(blogs);
  let totalpage = Math.ceil(
    (await blog.find({ userId: req.params.userId })).length / limit
  );
  res.send({ blogs, totalpage });
});

app.post("/addblogs", upload.single("image"), async (req, res) => {
  const image = req.file.filename;

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

app.put(
  "/updateblogs/:_id",
  upload.single("image"),
  verifyToken,
  async (req, res) => {
    try {
      let image;
      const oldBlogs = await blog.findOne({ _id: req.params });
      if (req.file) {
        if (req.file.filename === oldBlogs.image) {
          image = req.file.filename;
        } else if (req.file.filename !== oldBlogs.image) {
          image = req.file.filename;
          const oldImage = `uploads/${oldBlogs.image}`;
          await fs.unlinkSync(oldImage);
        }
      } else {
        image = oldBlogs.image;
        console.log(image);
      }

      let data = await blog.updateOne(req.params, {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          image: image,
        },
      });
      res.send(data);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
);
app.delete("/delete/:_id", verifyToken, async (req, res) => {
  let data = await blog.deleteOne(req.params);
  res.send(data);
});

app.get("/search/:userId/:key", verifyToken, async (req, res) => {
  let data = await blog.find({
    userId: req.params.userId,
    $or: [
      { name: { $regex: req.params.key } },
      // { password: { $regex: req.params.key } },
      // { email: { $regex: req.params.key } },
    ],
  });
  res.send(data);
});

app.get("/searchall/:key",verifyToken, async (req, res) => {
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
    console.log("error");
    // resp.status(401).send({ result: "Please Add token with headers" });
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
      res.send("error");
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = jwtkey + oldUser[0].password;
    const token = jwt.sign(
      { email: oldUser[0].email, id: oldUser[0]._id },
      secret,
      {
        expiresIn: "8h",
      }
    );
    const olduserId = oldUser[0]._id;
    var link = "";
    if (olduserId === oldUser[0]._id && token === token) {
      link = `http://localhost:3000/resetPassword/${olduserId}/${token}`;
    } else {
      link = `http://localhost:3000/login/forgotPassword/`;
      alert("please enter valid email");
    }
    console.log(link);
    // code for mailling.........................................................................................
    // var transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'mitenpate1234@gmail.com',
    //     pass: 'nqsjkbvucdbsnnfa'
    //   }
    // });

    // var mailOptions = {
    //   from: 'mitenpate1234@gmail.com',
    //   to: `${email}`,
    //   subject: 'Sending Email using Node.js',
    //   text: `${link}`
    // };

    // transporter.sendMail(mailOptions, function(error, info){
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // });

    res.send("ok ");
  } catch (error) {}
});
app.get("/resetPassword/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = jwtkey + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.send({ email: verify.email, status: "not varify" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified" + error);
  }
});
app.post("/resetPassword/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  // console.log(id);
  // console.log(token);
  const { password } = req.body;
  // console.log(password);
  const oldUser = await User.find({ _id: id });
  // console.log(oldUser);
  // console.log(oldUser[0].password);
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = jwtkey + oldUser[0].password;
  const secpass = await bcrypt.hash(password, 10);
  // console.log(secpass);
  try {
    const verify = jwt.verify(token, secret);

    console.log(verify);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: secpass,
        },
      }
    );
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
  res.send(oldUser);
});

app.post("/refreshToken", async (req, res) => {
  // console.log(req.body.Refresh);

  await jwt.verify(req.body.Refresh, "refreshToken", (err, auth) => {
    if (err) {
      res.status(404).send(err);
    } else {
      let token = jwt.sign({ _id: auth._id }, jwtkey, { expiresIn: "2h" });
      res.status(201).send(token);
      // console.log(token);
    }
  });
  // res.status(200).send(req.body);
});

app.listen(port, () => console.log(`Database listening on port ${port}!`));
