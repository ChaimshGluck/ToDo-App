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
// app.use(function (req, res, next) {
//     res.send('Server is up and running...');
//     next()
// })

const publicPath = path.join(__dirname, '../react-client/dist');
app.use('/', express.static(publicPath));

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

// app.get('*', (req, res) => {
//     console.log(`Serving index file from: ${publicPath}`);
//     res.sendFile(path.join(publicPath, 'index.html'));
// });

app.listen('3000', () => {
    console.log(`The server is now listening to requests on port 3000 ...`)
});