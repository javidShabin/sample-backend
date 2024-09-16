const mongoose = require("mongoose");

const reviewShema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: false,
  },
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
    required: false,
  },
  rating: { type: Number, required: true },
  comment: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});
const Review = mongoose.model("review", reviewShema);
module.exports = { Review };
