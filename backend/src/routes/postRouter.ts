import express from 'express';
import { addPost } from '../controllers/postController';

const postRouter = express.Router();

postRouter.post("/", addPost);

export default postRouter;