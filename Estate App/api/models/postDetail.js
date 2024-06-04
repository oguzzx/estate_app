import mongoose from "mongoose";

const postDetailSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
      required: true,
    },
    utilities: {
      type: String,
      required: true,
    },
    pet: {
      type: String,
      required: true,
    },
    income: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    school: {
      type: Number,
      required: true,
    },
    bus: {
      type: Number,
      required: true,
    },
    restaurant: {
      type: Number,
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  { timestamps: true }
);

const PostDetail = mongoose.model("PostDetail", postDetailSchema);
export default PostDetail;
