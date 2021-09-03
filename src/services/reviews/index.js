import express from "express";
import createError from "http-errors";
import q2m from "query-to-mongo";
import ReviewModel from "./schema.js";
import { ProductModel } from "../products/schema.js";

const reviewRouter = express.Router();

reviewRouter.post("/", async (req, resp, next) => {
  try {
    const newReview = new ReviewModel(req.body);
    const { _id } = await newReview.save();
    resp.status(201).send({ _id });
  } catch (err) {
    next(err);
  }
});

reviewRouter.get("/", async (req, resp, next) => {
  try {
    const query = q2m(req.query);
    const total = await ReviewModel.countDocuments(query.criteria);
    const reviews = await ReviewModel.find(query.criteria, query.options.fields)
      .limit(query.options.limit)
      .skip(query.options.skip)
      .sort(query.options.sort);
    resp.send({
      links: query.links("/reviews", total),
      total,
      reviews,
      pageTotal: Math.ceil(total / query.options.limit),
    });
  } catch (err) {
    next(err);
  }
});

reviewRouter.get("/:id", async (req, resp, next) => {
  try {
    const review = await ReviewModel.findById(req.params.id);
    if (review) {
      resp.send(review);
    } else {
      next(createError(404, `Review with id ${req.params.id} not found`));
    }
  } catch (err) {
    next(err);
  }
});

reviewRouter.put("/:id", async (req, resp, next) => {
  try {
    const updatedReview = await ReviewModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    resp.send(updatedReview);
  } catch (err) {
    next(err);
  }
});

reviewRouter.delete("/:id", async (req, resp, next) => {
  try {
    const review = await ReviewModel.findById(req.params.id);
    if (!review) {
      resp
        .status(404)
        .send({ message: `Review with id ${req.params.id} not found` });
    } else {
      await ReviewModel.findByIdAndDelete(req.params.id);
      resp.status(204).send();
    }

    resp.send(updatedReview);
  } catch (err) {
    next(err);
  }
});

export default reviewRouter;
