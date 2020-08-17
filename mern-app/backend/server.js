
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

const uri = 'mongodb+srv://dbUser:qLibeouyfwf78ywt9f8fwe@cluster0.l6ofs.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority';

// const uri = process.env;
mongoose.connect(uri, {  useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established sucsessfully");
})

const mealsRouter = require('./routes/meals');
const usersRouter = require('./routes/users')

app.use('/meals', mealsRouter);
app.use('/users', usersRouter);


app.listen(port, () =>{
    console.log("server is running on port " + port);
})