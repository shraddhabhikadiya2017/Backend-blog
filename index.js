import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "./controllers/postsControllers.js";
import dotenv from "dotenv";
import { getHello } from "./controllers/generalControllers.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/", getHello);

app.get("/posts", getAllPosts);

app.post("/posts", createPost);

app.get("/posts/:id", getPostById);

app.put("/posts/:id", updatePost);

app.delete("/posts/:id", deletePost);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
