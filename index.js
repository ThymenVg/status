const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static("./public/Login_v10"));

const port = process.env.PORT || 8130; 
app.listen(port, console.log("connected.."));