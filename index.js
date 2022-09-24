require('dotenv').config();
const port = 5000;

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { appendFile } = require('fs');

mongoose.connect(process.env.MONGO_URL);

const app = express();
app.set('view engine' , 'pug');
app.set('views' , './views');

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(port, function() {
  console.log('Sever listening on port ' + port);
});