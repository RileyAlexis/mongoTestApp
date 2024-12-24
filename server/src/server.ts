import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

//Types
import { Request, Response } from 'express';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
    });
}

app.get('/api', (req: Request, res: Response) => {
    res.json({ message: 'Backend server is connected' });
});

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})