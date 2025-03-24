import express from 'express';
import { addPost, getPosts } from '../controllers/postController';

const postRouter = express.Router();

postRouter.post("/", addPost);
postRouter.get("/", getPosts);

export default postRouter;