const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const route = require('./routes/index');

//* load config
dotenv.config({path :"./config/.env"});

const app = express();

//* logging
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'));
}

//* Database connection
require('./utils/database');
//* End of connection


//* middlewares
app.use(express.json());


//* routes
app.use("/admin" , route);

//* geting port from env
const port = process.env.PORT;


app.listen(port , () => console.log(`Server is Up and Running on ${process.env.NODE_ENV} mode in port ${port}`));