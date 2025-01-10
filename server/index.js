const express = require("express");
require("dotenv").config();
const app = express();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_CODE = process.env.SECERET;
const { UserDataModel } = require("../server/database/db");
const cors = require("cors");
const { authMiddleware } = require("./authMiddleWares/auth");

// MIDDLEWARES LINED HERE
app.use(express.json());
app.use(
  cors({
    origin: ["https://leeterboard-compete.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// SIGNUP
app.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const myUsername = "defaultUsername";
  try {
    await UserDataModel.create({
      email: email,
      password: hashedPassword,
      privateRooms: [],
      myUsername: myUsername,
    });

    const findUser = await UserDataModel.findOne({
      email: email,
    });

    const token = await jwt.sign({ id: findUser._id }, JWT_CODE, {
      expiresIn: "6d",
    });

    return res.status(200).json({
      email,
      token,
      myUsername,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({
      error: `signup failed : ${error.message}`,
    });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const findUser = await UserDataModel.findOne({
    email: email,
  });
  if (!findUser) {
    return res.status(404).json({
      message: "User not found in the Database! Please Signin First",
    });
  }
  const matchCheck = await bcrypt.compare(password, findUser.password);
  if (matchCheck) {
    const token = await jwt.sign({ id: findUser._id }, JWT_CODE, {
      expiresIn: "6d",
    });
    return res.json({
      email: email,
      token: token,
    });
  } else {
    return res.status(401).json({
      message: "enter the correct Password",
    });
  }
});

// INDIRECT FETCHING REQUESTS
let leetcode = require("./leetcodeData/requestFormat");

app.get("/data", (req, res) => {
  res.send(
    `<b>API URL:</b>/<b style="color:crimson;">yourLeetcodeUsername</b>`
  );
});

// FETCH DATA OF A SINGLE USERNAME
app.get("/data/:id", leetcode.leetcodeData);
app.get("/validUsername/:id",leetcode.validUsername);

// ADDS A NEW USERNAME TO USERNAMES ARRAY
app.post("/addUsername", authMiddleware, async (req, res) => {
  const { username } = req.body;
  const userId = req.user;

  try {
    const user = await UserDataModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.leetcodeUsernames.includes(username)) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const response = await fetch(
      `${process.env.VITE_REACT_APP_BACKEND_BASEURL}/data/${username}`
    );
    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ message: "Invalid LeetCode username" });
    }

    const updatedUsernames = [...user.leetcodeUsernames, username];
    user.leetcodeUsernames = updatedUsernames;
    await user.save();

    res.json({
      message: "Username added",
      leetcodeUsernames: updatedUsernames,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the username" });
  }
});

// GET THE USERNAMES ARRAY FROM THE DATABASE
app.get("/getArray", authMiddleware, async (req, res) => {
  const userId = req.user;
  try {
    const user = await UserDataModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const leetcodeUsernames = user.leetcodeUsernames;
    res.json({
      leetcodeUsernames,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the usernames" });
  }
});

//DELETE A USERNAME FROM THE USERNAMES ARRAY FORM THE DATABASE
app.delete("/removeUsername", authMiddleware, async (req, res) => {
  const { username } = req.body;
  const userId = req.user;

  try {
    const user = await UserDataModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.leetcodeUsernames = user.leetcodeUsernames.filter(
      (uname) => uname !== username
    );

    await user.save();

    res.json({
      message: "Username removed",
      leetcodeUsernames: user.leetcodeUsernames,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while removing the username" });
  }
});


// INIT DATABASE AND HOST ON A PORT
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server is listening on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
