import express, {Request, Response} from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv';
import contactRouter from './routes/contactRouter';

dotenv.config();

const app = express();

app.use(cors());

app.use("/contact", contactRouter);

app.get("/", (req: Request, res: Response) => console.log('hi'))
app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));