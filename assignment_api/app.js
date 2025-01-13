const express = require('express');
const app = express();
const db = require('./db.js');
const cors = require('cors');
require("dotenv").config({ path: ".env" });
const path = require('path');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(cors({
    origin: '*'
}));
app.get('/', (req, res) => {
    try {
        //console.log('Assingment API is running.........');
        res.send('<h1>Assignment API is running.........</h1>');
    }
    catch{
        console.log('error');
        
    }
})



const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

app.listen(process.env.PORT || 4000, function() {
    console.log('App running on port 4000.');
    db.connect(function(err) {
        if(err) {
            console.log('db connection error', err);
        }
        else {
            console.log('db connection successful');
        }
    })

});