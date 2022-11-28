const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path');
const bodyParser = require('body-parser');
const cors = require("cors")


const { authRouter } = require('./router/authRouter');
const { authMiddleware, authicate } = require('./middlewares/authMiddleware');
const { userRouter } = require('./router/userRouter');
const { getUser } = require('./controllers/userController');
const { infoRouter } = require('./router/userInfoRouter');
const { listRouter } = require('./router/listRouter')

const {parsed: {MOONGO_KEY}} = require('dotenv').config({path: './.env'})
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

mongoose.connect(MOONGO_KEY);
app.use(cors({
  exposedHeaders: ['x-access-token, x-refresh-token']
}))
app.use(bodyParser.json());
app.use(morgan('tiny', { stream : accessLogStream}));

app.use('/api/lists', authicate ,listRouter);
app.use('/api/users', authRouter);
app.use('/api/user', authMiddleware, userRouter)
app.use('/api/userInfo', authicate, infoRouter)


const start = async () => {
    try {
      app.listen(8080);
    } catch (err) {
      console.error(`Error on server startup: ${err.message}`);
    }
  };
  
  start();
  
  app.use(errorHandler);
  
  function errorHandler(err, req, res, next) {
    console.log(err.message);
    res.status(500).send({message: 'Server error'});
  }
  