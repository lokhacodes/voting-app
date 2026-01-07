import express from 'express';
import { PORT, mongoDBURL } from './.env';
import mongoose from 'mongoose';

const app = express();

app.get('/', (req, res) => {
    console.log(res);
    return res.status(200).send('Hello, World!');
});




mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));