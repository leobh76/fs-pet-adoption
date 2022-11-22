import mongoose from "mongoose";

const petSchema = mongoose.Schema({
  creator: String,
  petName: String,
  petType: String,
  adoptionStatus: String,
  imageFile: String,
  height: Number,
  weight: Number,
  color: String,
  hypoallergenic: String,
  dietaryRestrictions: String,
  breed: String,
  bio: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likes: {
    type: [String],
    default: [],
  },
});

const PetModel = mongoose.model("Pet", petSchema);

export default PetModel;