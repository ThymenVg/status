const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static("./public"));

const port = process.env.PORT || 8130; 
app.listen(port, console.log("connected.."));