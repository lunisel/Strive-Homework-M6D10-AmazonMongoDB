import mongoose from "mongoose"

const { Schema, model } = mongoose

const CategorySchema = new Schema(
  {
    title: { type: String, required: true },
    surname: { type: String, required: true }
  },
  { timestamps: true }
)

export default model("Cateogry", CategorySchema)