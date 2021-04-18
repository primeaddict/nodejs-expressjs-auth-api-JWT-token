const express = require('express');
const app = express();
const mongoose = require('mongoose');
const HandleErrors = require('./other/handleErrors');
require('dotenv').config();

//MIDDLEWARE
app.use(express.json());


//CONNECT TO MONGOOSE
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, console.log("Connected to database"))


//ROUTES MIDDLEWARE
app.use('/api/auth/', require('./routes/authRoutes'));

app.use(HandleErrors);

let port = process.env.PORT || 3000;
app.listen(port, console.log(`Serve is up and running! at ${port}`))
