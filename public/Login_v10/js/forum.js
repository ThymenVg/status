let socket = io();

class MessageObject {
    constructor(msg, user) {
        this.msg = msg;
        this.user = user;
    }

    send() {
        this.time = getMsgTime();
        socket.emit("message", {
            msg: this.msg,
            time: this.time,
            user: this.user
        });
    }
}

let alreadyGotMessages = false;
socket.on("allMessages", messagesArray => {
    if (alreadyGotMessages) return;
    messagesArray.forEach(msgObj => {
        appendMessage(msgObj);
    });
    alreadyGotMessages = true;
});

function testSendMessage(msg) {
    let user = "tester";
    const msgObj = new MessageObject(msg, user);
    msgObj.send();
}

socket.on("message", msgObj => {
    appendMessage(msgObj);
});


function getMsgTime() {
    const date = new Date();
    return `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} ${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}/${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}/${date.getFullYear()}`;
}



// UI interaction
const input = document.getElementById("msg-input");
const form = document.getElementById("form");
const msgContainer = document.getElementById("msg-container");
const userNameInput = document.getElementById("username-input");

userNameInput.value = localStorage.getItem("username") || "";
userNameInput.onchange = storeUsername;
function storeUsername() {
    localStorage.setItem("username", userNameInput.value);
}

form.onsubmit = submit;

/**
 * @param {Event} e 
 */
function submit(e) {
    e.preventDefault();
    try {
        const msg = input.value;
        if (!msg) return;
        input.value = "";
        const user = userNameInput.value;
        if (!user) return alert("Please specify a username")
        const msgObj = new MessageObject(msg, user);
        msgObj.send();
        appendMessage(msgObj);
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * @param {MessageObject} msgObj 
 */
function appendMessage(msgObj, isOwn) {
    let msgElement = document.createElement("div");
    msgElement.classList.add("msg");
    msgElement.innerHTML = `
        <div class="msg-user">${msgObj.user}</div>
        <div class="msg-content">${msgObj.msg.replace(/\n/g, '<br />')}</div>
        <div class="msg-time">${msgObj.time}</div>
    `;
    msgContainer.appendChild(msgElement);
}