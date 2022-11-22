import UserModel from "../models/user.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// create user controller
export const createUser = async (req, res) => {
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
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong..." });
    console.log(error);
  }
};

// get all users controller
export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong..." });
  }
};

// get user by id controller
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong..." });
  }
};

// get users by admin id controller
export const getUsersByAdmin = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User does not exist" });
  }
  const userPets = await UserModel.find({ id: id });
  res.status(200).json(userPets);
};

// delete user controller
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: `No user matches with id: ${id} ` });
    }
    await UserModel.findByIdAndRemove(id);
    res.json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong..." });
  }
};

// update user controller
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    isAdmin,
    id: _id,
  } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: `No user matches with id: ${id} ` });
    }
    const updatedUser = {
      firstName,
      lastName,
      email,
      password,
      phone,
      isAdmin,
      _id: id,
    };
    await UserModel.findByIdAndUpdate(id, updatedUser, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong..." });
  }
};
