import express from 'express';
import { searchContacts } from '../controllers/contactController';

const contactRouter = express.Router();
contactRouter.get("/:keyword", searchContacts);

export default contactRouter;