import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: { type: String },
  descriptions: { type: String },
  name: { type: String },
  creator: { type: String },
  // tags: { type: [String] },
  imageFile: { type: String },
  createdAt: { type: Date, default: new Date() },
  likes: { type: [String], default: [] },
})

export default mongoose.model('Tour', schema)