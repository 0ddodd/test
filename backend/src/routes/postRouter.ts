import express from 'express';
import { addPost } from '../controllers/postController';

const postRouter = express.Router();

// postRouter.get("/", postController);
postRouter.post("/", addPost);

export default postRouter;