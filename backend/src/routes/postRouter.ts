import express from 'express';
import { addPost, getPost, getPosts } from '../controllers/postController';

const postRouter = express.Router();

postRouter.post("/", addPost);
postRouter.get("/:id", getPost);
postRouter.get("/", getPosts);

export default postRouter;