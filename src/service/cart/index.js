import mongoose from "mongoose";

const { Schema, model } = mongoose;

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      name: String,
      brand: String,
      imageUrl: String,
      price: Number,
      quantity: Number,
    },
  ],
  status: { type: String, enum: ["unpaid", "paid"] },
});

export default model("Cart", cartSchema);
