require("dotenv").config();
const JWT_CODE = process.env.SECERET;
const mongoose=require("mongoose")
const jwt=require('jsonwebtoken')
const { UserDataModel } = require("../database/db");
const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token=authorization.split(' ')[1];
  try {
    const {id}=jwt.verify(token,JWT_CODE)
    req.user=id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({error : "request is not authorized"})
  }
};

module.exports = {
  authMiddleware,
};
