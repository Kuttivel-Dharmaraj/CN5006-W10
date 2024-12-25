const mongoose = require('mongoose');

mongoose.set('strictQuery', true); // Suppress the deprecation warning

const MONG_URI = 'mongodb://localhost:27017/Alib';
mongoose.connect(MONG_URI, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', function (err) {
    console.log('Error occurred: ' + err);
});

db.once('connected', function () {
    console.log('Connection is successful to ' + MONG_URI);
});

module.exports = db;
