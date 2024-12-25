var express = require("express");
let Books = require('./BooksSchema');
require('./MongoDBConnect');
const cors = require('cors');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Default Route
app.get('/', function (req, res) {
    res.send("This is default");
});

// About Route
app.get('/about', function (req, res) {
    res.send("MongoDB Express React and Mongoose app");
    Books.countDocuments().then(count => {
        console.log("Total documents count:", count);
    }).catch(err => {
        console.error(err);
    });
});

// Get all books
app.get('/allbooks', function (req, res) {
    Books.find(function (err, allBooks) {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving books');
        } else {
            res.json(allBooks);
        }
    });
});


// Get a single book by ID
app.get('/getbook/:id', function (req, res) {
    let id = req.params.id;
    Books.findById(id, function (err, book) {
        res.json(book);
    });
});

// Add a new book
app.post('/addbooks', function (req, res) {
    let newBook = new Books(req.body);
    newBook.save()
        .then(() => {
            res.status(200).json({ message: 'Book added successfully' });
        })
        .catch(err => {
            res.status(400).send('Adding new book failed');
        });
});

// Update a book by ID
app.post('/updatebook/:id', function (req, res) {
    let id = req.params.id;
    Books.findByIdAndUpdate(id, req.body, function (err) {
        if (err) {
            res.status(400).send('Updating book failed');
        } else {
            res.status(200).json({ message: 'Book updated successfully' });
        }
    });
});

// Delete a book by ID
app.post('/deleteBook/:id', function (req, res) {
    let id = req.params.id;
    Books.findByIdAndDelete(id, function (err) {
        if (err) {
            res.status(400).send('Deleting book failed');
        } else {
            res.status(200).send('Book deleted');
        }
    });
});

// Start the server
app.listen(5000, function () {
    console.log("Server is running on port 5000");
});
