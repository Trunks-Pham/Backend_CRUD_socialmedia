const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

require('dotenv').config();


//connect 
require('./dbs/mongo');

//set router
app.use(require('./routers'));


app.get('/', (req, res) => {
    return res.status(200).json({
      message: 'server is ok'
    });
  });

module.exports = app;
