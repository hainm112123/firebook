require('dotenv').config();
const port = 5000;

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { appendFile } = require('fs');

mongoose.connect(process.env.MONGO_URL);

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.set('view engine' , 'pug');
app.set('views' , './views');

const postRoute = require('./routes/post.route');
const authRoute = require('./routes/auth.route');
const messageRoute = require('./routes/message.route');
const photoRoute = require('./routes/photo.route');

const userDataMiddleware = require('./middlewares/userData.middleware');
const authMiddleware = require('./middlewares/auth.middleware');

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public'));

app.use(userDataMiddleware.checkData);

// app.get('/', authMiddleware.requireAuth, function(req, res) {
//   res.render('index');
// });
app.get('/logout', authMiddleware.requireAuth, function(req, res) {
  res.clearCookie('userId');
  res.redirect('/');
});

app.use('/', postRoute);
app.use('/auth', authMiddleware.authed, authRoute);
app.use('/messages', messageRoute);
app.use('/photo', photoRoute);

io.on('connection', function(socket) {
  socket.on('message' , message => {
    io.emit('message' , message);
  })
})

http.listen(port, function() {
  console.log(`Socket.io sever running at http://localhost:${port}/`);
});