import PetModel from "../models/pet.js";
import mongoose from "mongoose";

// create pet controller
export const createPet = async (req, res) => {
  const pet = req.body;
  const newPet = new PetModel({
    ...pet,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong..." });
  }
};

// get all pets controller
export const getPets = async (req, res) => {
  try {
    const pets = await PetModel.find();
    res.status(200).json(pets);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong..." });
  }
};

// get pet by id controller
export const getPet = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await PetModel.findById(id);
    res.status(200).json(pet);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong..." });
  }
};

// get pets by user id controller
export const getPetsByUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User does not exist" });
  }
  const userPets = await PetModel.find({ creator: id });
  res.status(200).json(userPets);
};

// delete pet controller
export const deletePet = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: `No pet matches with id: ${id} ` });
    }
    await PetModel.findByIdAndRemove(id);
    res.json({ message: "Pet deleted successfully!" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong..." });
  }
};

// update pet controller
export const updatePet = async (req, res) => {
  const { id } = req.params;
  const {
    petName,
    petType,
    adoptionStatus,
    height,
    weight,
    color,
    hypoallergenic,
    dietaryRestrictions,
    breed,
    bio,
    imageFile,
    creator,
  } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: `No pet matches with id: ${id} ` });
    }
    const updatedPet = {
      petName,
      petType,
      adoptionStatus,
      height,
      weight,
      color,
      hypoallergenic,
      dietaryRestrictions,
      breed,
      bio,
      imageFile,
      creator,
      _id: id,
    };
    await PetModel.findByIdAndUpdate(id, updatedPet, { new: true });
    res.json(updatedPet);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong..." });
  }
};

// search pets by name controller
export const getPetsBySearch = async (req, res) => {
  const { searchquery } = req.query;
  try {
    const petName = new RegExp(searchquery, "i");
    const pets = await PetModel.find({ petName });
    res.json(pets);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong..." });
  }
};

// like pet controller
export const likePet = async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.userId) {
      return res.json({ message: "User is not authenticated." });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: `No pet matches with id: ${id} ` });
    }
    const pet = await PetModel.findById(id);
    const index = pet.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
      pet.likes.push(req.userId);
    } else {
      pet.likes = pet.likes.filter((id) => id !== String(req.userId));
    }
    const updatedPet = await PetModel.findByIdAndUpdate(id, pet, { new: true });
    res.status(200).json(updatedPet);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
