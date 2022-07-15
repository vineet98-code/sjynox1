
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var cors = require('cors');
var app = express();
const PORT  = process.env.PORT || 5000;



mongoose.connect('mongodb+srv://items:E3KI0MPy0Q1glBOP@cluster0.nx8yv.mongodb.net/files?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true }, (err) => console.log(err ? err : "Connected true")
);

// E3KI0MPy0Q1glBOP - password
// items - username

app.use(express.json());

app.use(cors())
// For dealing in json
// app.use(express.urlencoded({ extended: true }));

require('./models/user');
require('./models/item');
app.use(require('./routes.js/auth'))
app.use(require('./routes.js/item'))



app.listen(PORT, () => {
    console.log('Server is runnning on', PORT)
})

module.exports = app;