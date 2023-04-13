import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { Hasher, VerifyPassword } from "../utils/hashPassword.js";

const secretKey = process.env.JWT_SECRET_KEY;

export const user_login = async (req, res) => {
  let { email, password } = req.body;
  let existingUser, isgeniune, token;
  try {
    existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      try {
        isgeniune = VerifyPassword(password, existingUser.password);
        if (isgeniune) {
          token = jwt.sign(
            { id: existingUser._id, email: existingUser.email },
            secretKey,
            {
              expiresIn: "1hr",
            }
          );
          res.cookie(String(existingUser._id), token,{
            path:"/",
            expires: new Date(Date.now()+1000*30),
            http
          })
          return res
            .status(200)
            .json({ message: "Login successfull", user: existingUser, token });
        } else {
          return res.status(400).json({ message: "Wrong credentails" });
        }
      } catch (error) {
        return res.status(400).json({ error: error?.message });
      }
    } else {
      return res.status(400).json({ error: "Phele register kr lodu" });
    }
  } catch (error) {
    return res.status(400).json({ error: error?.message });
  }
};

export const user_signup = async (req, res, next) => {
  let newUser, existingUser;
  let { name, email, password } = req.body;
  existingUser = await userModel.findOne({ email: email });
  if (existingUser) {
    try {
      return res.status(400).json({ message: "User already exists" });
    } catch (error) {
      return res.status(400).json({ error: error?.message });
    }
  }
  try {
    newUser = new userModel({
      name: name,
      email: email,
      password: Hasher(password),
    });
    await newUser.save();
  } catch (error) {
    res.status(400).json(error?.message);
  }
  res.status(201).json({ message: "Signin success", newUser });
};

export const all_user = async (req, res) => {
  let users = await userModel.find({});
  res.status(200).json(users);
};

export const verifyToken = async (req, res, next) => {
  let headers = req.headers["authorization"];
  let token = headers.split(" ")[1];
  if (!token) {
    return res.status(404).json({ message: "No Token Found" });
  }
  jwt.verify(String(token), secretKey, (error, user) => {
    console.log(typeof token, "helo");
    if (error) {
      return res
        .status(400)
        .json({ message: "Invalid Token", error: error.message });
    }
    req.id = user.id;
  });
  next();
};

export const getUser = async (req, res, next) => {
  let id = req.id;
  if (!req.id) {
    return res.status(400).json({ message: "Invalid or missing user ID" });
  }
  let user;
  try {
    user = await userModel.findById({ _id: id }, "-password");
  } catch (error) {
    return new Error(error);
  }
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  res.status(200).json(user);
};
