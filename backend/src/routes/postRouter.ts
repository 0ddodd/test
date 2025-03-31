import express from 'express';
import { addPost, deletePost, getPost, getPosts } from '../controllers/postController';

const postRouter = express.Router();

postRouter.post("/", addPost);
postRouter.get("/:id", getPost);
postRouter.get("/", getPosts);
postRouter.delete("/:id", deletePost);

export default postRouter;