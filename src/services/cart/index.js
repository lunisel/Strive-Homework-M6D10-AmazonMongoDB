import { Router } from "express";
import createHttpError from "http-errors";
import cartModel from "./schema.js";
import { ProductModel } from "../products/schema.js";

const cartRouter = Router();

cartRouter.post("/:userId/toCart", async (req, res, next) => {
  try {
    const productToBuy = await ProductModel.findById(req.body.productId);
    if (productToBuy) {
      const checkProduct = await cartModel.findOne({
        userId: req.params.userId,
        status: "unpaid",
        "products.name": productToBuy.name,
      });
      if (checkProduct) {
        const updateProduct = await cartModel.findOneAndUpdate(
          {
            userId: req.params.userId,
            status: "unpaid",
            "products.name": productToBuy.name,
          },
          {
            $inc: {
              "products.$.quantity": req.body.quantity,
            },
          },
          { new: true, runValidators: true }
        );
        res.send(updateProduct);
      } else {
        const newProduct = {
          ...productToBuy.toObject(),
          quantity: req.body.quantity,
        };

        const updateProduct = await cartModel.findOneAndUpdate(
          { userId: req.params.userId, status: "unpaid" },
          {
            $push: { products: newProduct },
          },
          {
            runValidators: true,
            upsert: true, // if cart does not exists just create it
            new: true,
          }
        );
        res.send(updateProduct);
      }
    } else {
      next(
        createHttpError(404, `product with ${req.body.productId} Not Found!!`)
      );
    }
  } catch (error) {
    next(error);
  }
});
cartRouter.get("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
cartRouter.get("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
cartRouter.put("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
cartRouter.delete("/", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default cartRouter;

// }
//   const newProduct = {
//     ...productToBuy.toObject(),
//     quantity: req.body.quantity,
//   };
//   const updateProduct = await cartModel.findOneAndUpdate(
//     {
//       userId: req.params.userId,
//       status: "unpaid",
//     },
//     {
//       $push: {
//         products: newProduct,
//       }

//     }

//     {new: true, runValidators: true}

//   );
