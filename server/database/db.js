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
  }
});


const UserDataModel = mongoose.model("UserData", UserData);

module.exports={
  UserDataModel,
}
