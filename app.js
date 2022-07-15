
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var cors = require('cors');
var app = express();
const {MOGOURI} = require('./config/keys')
const PORT  = process.env.PORT || 5000;



mongoose.connect(MOGOURI,
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


if(process.env.NODE_ENV=='production'){
    const path = require('path')

    app.get('/',(req,res)=>{
        app.use(express.static(path.resolve(__dirname,'frontend','build')))
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })
}


app.listen(PORT, () => {
    console.log('Server is runnning on', PORT)
})

module.exports = app;