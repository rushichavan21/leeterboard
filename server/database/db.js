const { request } = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = mongoose.ObjectId;
const UserData = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  leetcodeUsernames: {
    type: [String],
    required: true,
    default: [],
  },
  privateRooms:{
    type:[],
    required:true,
    unique:true,
  },
  
});

const PrivateRoomFolder=new Schema({
  roomKey:{
    type:String,
    required:true,
    unique:true
  },
  roomName:{
    type:String,
    required:true,
  },
  leetcodeUsernames:{
  type:[String],
  default:[],
  required:true,
  },
  Admin:{
    type:String,
    required:true,
  }
})


const UserDataModel = mongoose.model("UserData", UserData);
const PrivateRoomModel=mongoose.model("PrivateRoomFolder",PrivateRoomFolder)
module.exports={
  UserDataModel,
  PrivateRoomModel,
}
