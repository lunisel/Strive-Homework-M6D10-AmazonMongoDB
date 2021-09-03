import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import reviewRouter from "./reviews/index.js";

const port = process.env.PORT;
const mongoConnection = process.env.MONGO_CONNECTION_STRING;

const server = express();

server.use(cors());
server.use(express.json());

server.use("/reviews", reviewRouter);

server.listen(port, async () => {
  try {
    mongoose.connect(mongoConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `Server is running on port ${port} and is connected to mongoDB`
    );
  } catch (err) {
    console.log(`Db connection faild : ${err}`);
  }
});

server.on("error", (error) => console.log(`Server faild : ${error}`));
