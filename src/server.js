import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import cartRouter from "./service/cart/index.js";

const port = process.env.PORT;

const server = express();

server.use(cors());
server.use(express.json());

server.use("/carts", cartRouter);

mongoose.connect(process.env.MONGO_CON);
mongoose.connection.on(`connected`, () => {
  console.log(`🥭Connected to 🥭 Successfully`);
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`🖥💻 runing on: ${port}`);
  });
});

mongoose.connection.on(`error`, (err) => {
  console.log(`error==> ${err}`);
});
