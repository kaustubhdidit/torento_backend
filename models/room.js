import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  display:{
    type: Boolean,
    default:true,
  },
  area:{
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  fbuid:{
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: true,
  },
  residents:{
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    default: false,
  },
  price: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Room = mongoose.models.posts || mongoose.model("Room", schema);