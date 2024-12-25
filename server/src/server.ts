import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

//DB
import { pool } from './pool';
import SomeData from './models/modelSchema';

//Types
import { Request, Response } from 'express';
import { SomeDataType } from './models/modelSchema';
import { mongo } from 'mongoose';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

pool();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
    });
}

app.get('/api', (req: Request, res: Response) => {
    res.json({ message: 'Backend server is connected' });
});

app.post('/api/testDB', async (req, res) => {
    const { name, text, details } = req.body;
    console.log(req.body);
    try {
        const newData: SomeDataType = new SomeData({ name, text, details });
        const savedData = await newData.save();
        res.status(201).json(savedData);
    } catch (error) {
        res.status(500).json({ error: "Error Saving Data" });
    }
});

app.get('/api/testDB', async (req, res) => {
    console.log('get testDb called');
    try {
        const gotData = await SomeData.find();
        res.status(200).json(gotData);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data" })
    }
});

app.delete('/api/testDB/:id', async (req: Request, res: Response) => {

    const id = req.params.id;
    console.log('Delete Route', id);

    try {
        const deleteLine = await SomeData.findByIdAndDelete(id);

        if (!deleteLine) {
            res.status(404).json({ message: 'Record not found' });
        }

        res.status(200).json({ message: 'Record deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting record, this thing may be hopelessly broken' });
    }
});


const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})