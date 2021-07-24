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
app.get("/socket.io/:filename", (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, "node_modules", "socket.io", "client-dist", filename))
});

app.post("/updateHappiness", (req, res) => {
    let body = res.body;
    happiness = body.happinessValue;
});


let messageObjects = [];
io.on("connection", socket => {
    console.log(`user ${socket.id} connected`);
    // send ALL (maybe limited amount?) msgs to socket.id from database
    socket.emit("allMessages", messageObjects);

    socket.on("message", msgObj => {
        console.log(msgObj);
        // send this msg to all connected users, they append (sender does so locally)
        socket.broadcast.emit("message", msgObj);
        // store msg in database
        messageObjects.push(msgObj);
    });
});


const port = process.env.PORT || 8130;
server.listen(port, console.log(`connected...\nLink: http://localhost:${port}`));