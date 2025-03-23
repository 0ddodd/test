import express from 'express';
import { getContacts } from '../controllers/contactController';

const contactRouter = express.Router();
contactRouter.get("/", getContacts);

export default contactRouter;