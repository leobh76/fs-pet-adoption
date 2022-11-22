import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.js";

const secret = "test";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await UserModel.findOne({ email });
    if (!oldUser)
      return res.status(404).json({ message: "User does not exist." });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    const { firstName, lastName, isAdmin } = oldUser;
    const resObj = {
      firstName,
      lastName,
      isAdmin
    };

    res.status(200).json({ result: resObj, token});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." });
    console.log(error);
  }
};

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;
  try {
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });
    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." });
    console.log(error);
  }
};

export const isAdmin = async (req, res) => {
  const { Authorization } = req.headers;
  try {
    const token = Authorization.split(" ")[1];
    const { isAdmin } = jwt.verify(token, secret);
    res.status(200).send(isAdmin);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." });
    console.log(error);
  }
};
