const express = require('express');
const path = require('path');
const fs = require('fs');
const { Server } = require("socket.io");
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static("./public/Login_v10/"));


let happiness = 6;
app.get("/happiness", (req, res) => {
    res.send({
        happiness: happiness
    });
})

app.post("/updateHappiness", (req, res) => {
    let body = res.body;
    happiness = body.happinessValue;
});

io.on("connection", socket => {
    // send ALL (maybe limited amount?) msgs to socket.id from database

    socket.on("message", msg => {
        // send this msg to all connected users, they append (sender does so locally)
        // store msg in database
    });
});


const port = process.env.PORT || 8130;
app.listen(port, console.log(`connected...\nLink: http://localhost:${port}`));