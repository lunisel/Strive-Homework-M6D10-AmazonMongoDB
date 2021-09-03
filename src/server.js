import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productRouter from "./services/products/index.js";
import listEndpoints from "express-list-endpoints";
import reviewRouter from "./reviews/index.js";
import cartRouter from "./service/cart/index.js";

const port = process.env.PORT || 3001;

const server = express();

server.use(cors());
server.use(express.json());

/* **************ROUTES ***************** */

server.use("/reviews", reviewRouter);
server.use("/products", productRouter);
server.use("/carts", cartRouter);

/* ***************CONNECTION TO MONGO COMPASS */
mongoose.connect(process.env.MONGO_CONNECTION);

mongoose.connection.on("connected", () => {
  console.log("Connection Successful to mongo!");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server is running on port ${port}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log("MONGO ERROR ", err);
});
