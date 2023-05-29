import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDb } from './src/config/db';
import noteRouters from './src/routers/noteRouters';
import authRouters from './src/routers/authRoutes';

dotenv.config();

connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/notes', noteRouters);
app.use('/api/auth', authRouters);

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
