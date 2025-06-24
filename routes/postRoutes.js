import { Router } from "express";
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from "../controllers/postsControllers.js";

const postsRouter = Router();

postsRouter.route('/').get(getAllPosts).post(createPost);

postsRouter.route('/:id').get(getPostById).put(updatePost).delete(deletePost);

export default postsRouter;