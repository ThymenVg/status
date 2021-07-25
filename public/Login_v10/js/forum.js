let socket = io();

let alreadyGotMessages = false;
socket.on("allMessages", messagesArray => {
    if (alreadyGotMessages) return;
    messagesArray.forEach(msgObj => {
        console.log(msgObj.time, "-", msgObj.msg);
        // append to display obj
    });
    alreadyGotMessages = true;
});

function sendMessage(msg) {
    let user = "guest"; // should be namefield!
    const time = getTime();
    console.log(time);
    socket.emit("message", {
        msg,
        time,
        user
    });
}

socket.on("message", msgObj => {
    console.log(msgObj.time, "-", msgObj.msg);
});


function getTime() {
    const date = new Date();
    return `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} ${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}/${date.getFullYear()}`;
}