import mongoose from "mongoose";
import { date } from "zod";

const NodeSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  parentId: {
    type: String,
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NodePost",
    },
  ],
});

const NodePost =
  mongoose.models.NodePost || mongoose.model("NodePost", NodeSchema);

export default NodePost;
