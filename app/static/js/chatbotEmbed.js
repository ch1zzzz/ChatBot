
        // inject CSS
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    font-size: 100%;
    background: #F1F1F1;
}

/**, html {
    --primaryGradient: linear-gradient(93.12deg, #581B98 0.52%, #9C1DE7 100%);
    --secondaryGradient: linear-gradient(268.91deg, #581B98 -2.14%, #9C1DE7 99.69%);
    --primaryBoxShadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
    --secondaryBoxShadow: 0px -10px 15px rgba(0, 0, 0, 0.1);
    --primary: #581B98;
}*/

*, html {
    --primaryGradient: linear-gradient(93.12deg, #0074E4 0.52%, #4CB8E0 100%);
    --secondaryGradient: linear-gradient(268.91deg, #0074E4 -2.14%, #4CB8E0 99.69%);
    --primaryBoxShadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
    --secondaryBoxShadow: 0px -10px 15px rgba(0, 0, 0, 0.1);
    --primary: #0074E4;
}


/* CHATBOX
=============== */
.chatbox {
    position: absolute;
    bottom: 30px;
    right: 30px;
}

/* CONTENT IS CLOSE */
.chatbox__support {
    display: flex;
    flex-direction: column;
    background: #eee;
    width: 450px;
    height: 600px;
    z-index: -123456;
    opacity: 0;
    transition: all .5s ease-in-out;
}

/* CONTENT ISOPEN */
.chatbox--active {
    transform: translateY(-40px);
    z-index: 123456;
    opacity: 1;

}

/* BUTTON */
.chatbox__button {
    text-align: right;
}

.send__button {
    padding: 6px;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
}


/* HEADER */
.chatbox__header {
    position: sticky;
    top: 0;
}

/* MESSAGES */
.chatbox__messages {
    margin-top: auto;
    display: flex;
    overflow-y: scroll;
    flex-direction: column-reverse;
}

.messages__item {
    background: orange;
    max-width: 80%;
    width: fit-content;
}

.messages__item--operator {
    margin-left: auto;
}

.messages__item--visitor {
    margin-right: auto;
}

/* FOOTER */
.chatbox__footer {
    position: sticky;
    bottom: 0;
}

.chatbox__support {
    background: white;
    height: 700px;
    width: 450px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}

/* HEADER */
.chatbox__header {
     background: var(--primaryGradient);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 15px 20px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    box-shadow: var(--primaryBoxShadow);
}

.chatbox__image--header {
    margin-right: 10px;
}

.chatbox__heading--header {
    font-size: 1.2rem;
    color: white;
}

.chatbox__description--header {
    font-size: .9rem;
    color: white;
}

/* Messages */
.chatbox__messages {
    padding: 0 20px;
}

.messages__item {
    font-size: 13px;
    white-space: pre-wrap;
    margin-top: 10px;
    background: #F4F6F8;
    padding: 8px 12px;
    max-width: 70%;
    line-height: 1.5;
}

.messages__item--visitor,
.messages__item--typing {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}

.messages__item--operator {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    background: var(--primary);
    color: white;
}

/* FOOTER */
.chatbox__footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px;
    background: var(--secondaryGradient);
    box-shadow: var(--secondaryBoxShadow);
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    margin-top: 20px;
}

.chatbox__footer input {
    width: 80%;
    border: none;
    padding: 10px 10px;
    border-radius: 30px;
    text-align: left;
}

.chatbox__send--footer {
    color: white;
}

.chatbox__button button,
.chatbox__button button:focus,
.chatbox__button button:visited {
    padding: 10px;
    background: white;
    border: none;
    outline: none;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    border-bottom-left-radius: 50px;
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}

@keyframes dotPulse {
    0% { transform: scale(0.8); opacity: 0.5; }
    50% { transform: scale(1); opacity: 1; }
    100% { transform: scale(0.8); opacity: 0.5; }
}

.dotPulseWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
}

.dotPulse {
    background-color: #000;
    border-radius: 50%;
    width: 8px;
    height: 8px;
    margin: 3px;
    animation: dotPulse 1s infinite;
}

.dotPulse:nth-child(1) {
    animation-delay: 0s;
}

.dotPulse:nth-child(2) {
    animation-delay: 0.2s;
}

.dotPulse:nth-child(3) {
    animation-delay: 0.4s;
}
`;
        document.head.appendChild(style);

        // inject HTML
        document.body.innerHTML += `<div class="container">
    <div class="chatbox">
        <div class="chatbox__support">
            <div class="chatbox__header">
                <div class="chatbox__image--header">
                    <img width="48" height="48" src="../static/img/icon-chatbot.png" alt="chatbot"/>
                </div>
                <div class="chatbox__content--header">
                    <h4 class="chatbox__heading--header">Job Search Assistant</h4>
                    <p class="chatbox__description--header">Hi. How can I help you?</p>
                </div>
            </div>
            <div class="chatbox__messages">
                <div></div>
            </div>
            <div class="chatbox__footer">
                <input type="text" placeholder="Write a message...">
                <button class="chatbox__send--footer send__button">Send</button>
            </div>
        </div>
        <div class="chatbox__button">
            <button><img src="../static/img/chatbox-icon.png" /></button>
        </div>
    </div>
</div>`;

        // inject JS
        class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
        this.initialMessageDisplayed = false;
    }

    display() {
        const {openButton, chatBox, sendButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })

        // show initial message
        if (!this.initialMessageDisplayed) {
            this.displayInitialMessage(chatBox);
            this.initialMessageDisplayed = true;
        }
    }

    displayInitialMessage(chatbox) {
        const initialMsg = "Hello! I'm your Job Matching Assistant. I can help you find the perfect job opportunity from our job data. Just let me know what you're looking for, such as 'Registered nurse positions in Boston.' If you have questions about specific companies or the application process, feel free to contact our recruiter Jackson at xxx@xenonhealth.com.";
        let initialMessage = { name: "Chatbot", message: initialMsg };
        this.messages.push(initialMessage);
        this.updateChatText(chatbox);
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);

        // check if localStorage has sessionId
        let sessionId = localStorage.getItem("sessionId");

        // if not, create a new sessionId
        if (!sessionId) {
            sessionId = "uniqueID_" + Math.random().toString(36).substr(2, 9);  // 一个简单的随机 ID 生成方法
            localStorage.setItem("sessionId", sessionId);
        }

        // 1. update chat text, show user's input
        this.updateChatText(chatbox);

        // 2. show a loading message
        let loadingMsgHTML = '<div class="dotPulseWrapper"><div class="dotPulse"></div><div class="dotPulse"></div><div class="dotPulse"></div></div>';
        let loadingMsg = { name: "Chatbot", message: loadingMsgHTML };
        this.messages.push(loadingMsg);
        this.updateChatText(chatbox);

        // empty input
        textField.value = '';

        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1, sessionId: sessionId }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
              this.messages.pop()
              let msg2 = { name: "Chatbot", message: r.answer };
              this.messages.push(msg2);
              this.updateChatText(chatbox)

        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
          });
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "Chatbot")
            {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else
            {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
          });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}


const chatbox = new Chatbox();
chatbox.display();
    