import express from "express";
import cors from "cors";

const port = process.env.PORT;

const server = express();

server.use(cors());
server.use(express.json());

server.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});

server.on("error", (error) => console.log(`Server faild : ${error}`));
