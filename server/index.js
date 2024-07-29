import express from "express";
import cors from "cors";
import 'dotenv/config';
import tasksRoute from './routes/tasks.js';
import usersRouter from './routes/users.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT

const app = express();
app.use(express.static(path.join(__dirname, '..', 'client')));
app.use(cors({
    origin : 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser('Super-strong-secret'))

app.use('/tasks', tasksRoute);
app.use('/users', usersRouter)
app.use('/images', express.static('uploads'))
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '..', 'client', 'index.html');
    console.log(`Serving index file from: ${indexPath}`);
    res.sendFile(indexPath);
});

app.listen('3000', () => {
    console.log(`The server is now listening to requests on port 3000 ...`)
});