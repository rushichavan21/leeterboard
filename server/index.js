const express = require("express");
require("dotenv").config();
const app = express();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_CODE = process.env.SECERET;
const { UserDataModel, PrivateRoomModel } = require("../server/database/db");
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
      expiresIn: "3d",
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
      expiresIn: "3d",
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

//CREATES A NEW PRIVATE ROOM WITH A UNIQUE CODE

app.post("/private/room/create", authMiddleware, async (req, res) => {
  const { roomName } = req.body;
  const { roomCode } = req.body;
  const {myusername} = req.body;
  const adminEmail = "Admin@gmail.com"; // will change this later
  try {
    await PrivateRoomModel.create({
      roomName: roomName,
      roomKey: roomCode,
      leetcodeUsernames: [myusername],
      Admin: adminEmail,
    });
    return res.json({
      message: "room created successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({
      error: `room was not created : ${error.message}`,
    });
  }
});

// ADDS A NEW PRIVATE ROOM TO THE USER DATABASE

app.post("/private/user/add", authMiddleware, async (req, res) => {
  const myUsername = req.body;
  const userId = req.user;
  const { roomName, roomCode } = req.body;

  try {
    const user = await UserDataModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      const room = await PrivateRoomModel.findOne({ roomKey: roomCode });
      if (room) {
        const roomData = { roomName, roomCode };
        const check = user.privateRooms.findIndex(
          (room) => room.roomCode === roomCode
        );
        if (check !== -1) {
          return res.status(400).json({ message: "Room already exists" });
        }
        const temp=toString(myUsername);
        user.privateRooms.push(roomData);
        await user.save();
        room.leetcodeUsernames.push(temp);
        await room.save();
        res.json({
          message: "Room was added to the user's list of private rooms",
          privateRooms: user.privateRooms,
        });
      } else {
        return res
          .status(404)
          .json({ message: "Room not found in Private Rooms database" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "An error occurred while adding the room to the user's database",
    });
  }
});

//REMOVES A PRIVATE ROOM FROM THE USER DATABASE

app.delete("/private/user/remove", authMiddleware, async (req, res) => {
  const myUsername = "DefaultUsername";
  const userId = req.user;
  const { roomCode } = req.body;
  const { roomName } = req.body;
  try {
    const user = await UserDataModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "error! user not found",
      });
    } else {
      const toDelete = {
        roomName: roomName,
        roomCode: roomCode,
      };
      const check = (value) => {
        return value.roomCode !== toDelete.roomCode;
      };
      let filtered = user.privateRooms.filter(check);
      user.privateRooms = filtered;
      await user.save();
      console.log("room was removed from the user Data base");
      res.status(200).json({
        message: "room was removed from the user databse",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "An internal server occured",
      error: error,
    });
  }
});

app.get("/private/room/display", authMiddleware, async (req, res) => {
  const { roomCode } = req.query; 
  try {
    const response = await PrivateRoomModel.findOne({ roomKey: roomCode });
    if (response) {
      return res.status(200).json({
        data: response,
      });
    } else {
      return res.status(404).json({
        error: "Room not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error: error.message,
    });
  }
});


//DELETE A USERNAME FROM A PRIVATE ROOM
app.delete("/private/room/deleteUser", authMiddleware, async (req, res) => {
  const myUsername = "defaultUsername2";
  const { roomCode } = req.body;

  try {
    const room = await PrivateRoomModel.findOne({ roomKey: roomCode });
    
    if (!room) {
      return res.status(404).json({
        error: "Enter a valid room code! Desired room not found."
      });
    } else {
      room.leetcodeUsernames = room.leetcodeUsernames.filter(username => username !== myUsername);
      await room.save();

      return res.status(200).json({
        message: "User was removed from the room username data"
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Server Error!"
    });
  }
});

//DELETE A ROOM (ONLY ADMIN HAS THE ACCESS)
app.delete("/private/room/delete", authMiddleware, async (req, res) => {
  const { email, roomCode } = req.body;
  
  try {
   
    const room = await PrivateRoomModel.findOne({ roomKey: roomCode });
    
    if (!room) {
      return res.status(404).json({
        message: "Room not found with the mentioned roomCode"
      });
    }

  
    if (room.Admin === email) {
      await PrivateRoomModel.deleteOne({ roomKey: roomCode });
      return res.status(200).json({
        message: "Room was removed successfully"
      });
    } else {
      return res.status(400).json({
        error: "Only admin has access to delete the room"
      });
    }

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something unexpected happened"
    });
  }
});

app.get("/private/room/data",authMiddleware,async(req,res)=>{
  const userId=req.user;
  try {
    const user=await UserDataModel.findById(userId);
    if(!user){
      return res.status(404).json({message:"user not found"});
    }
    const roomData=user.privateRooms;
    res.status(200).json({
      roomData,
    });
  } catch (error) {
 res.status(400).json({
  error:"An error occured"
 })
  }
})

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
