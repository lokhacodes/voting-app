import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookmodel.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    
    return res.status(200).send('Hello, World!');
});


//route to save new book
app.post('/books', async(req, res) => {
    // Logic to add a new book will go here
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'send all required fields: title, author, publishYear'
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

//route for get all books 
app.get('/books', async (req, res)=>{
    try{
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data:books
        });
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

//route for get 1 book
app.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});



mongoose
    .connect(mongoDBURL, { ssl: true, sslValidate: false })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));