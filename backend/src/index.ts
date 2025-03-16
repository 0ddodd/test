import express, {Request, Response} from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());

app.get("/", (req: Request, res: Response) => console.log('hi'))
app.listen(3000, () => console.log(`Listening on ${process.env.PORT}`));