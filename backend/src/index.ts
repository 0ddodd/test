import express, {Request, Response} from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv';
import contactRouter from './routes/contactRouter';
import postRouter from './routes/postRouter';
import connectDB from './database/db';

dotenv.config();

const app = express();

// mongodb 연결
connectDB();

// app.use(cors());
app.use(cors({
    origin: 'https://marvelous-granita-ea2705.netlify.app',
    credentials: true
}));

app.use(express.json());

app.use("/post", postRouter);
app.use("/contact", contactRouter);

app.get("/", (req: Request, res: Response) => console.log('hi'))
app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));