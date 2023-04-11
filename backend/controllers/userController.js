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
    if (error) {
      return res
        .status(400)
        .json({ message: "Invalid Token", error: error.message });
    }
    // return res.status(200).json(user.id);
    console.log(user.email);
    req.id = user.id;
    req.email = user.email;
  });
};

const getUser = async (req, res, next) => {
  const { id, email } = req.data;
  let user;
  try {
    user = await userModel.findById({ _id: id }, "-pasword");
  } catch (error) {}
};
