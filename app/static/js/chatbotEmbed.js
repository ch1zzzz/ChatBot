
        // inject CSS
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `.cb_container * {
    box-sizing: border-box !important;
    margin: 0 !important;
    padding: 0 !important;
}

.cb_container {
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 400 !important;
    font-size: 100% !important;
    background: #F1F1F1 !important;
}

*, html {
    --primaryGradient: linear-gradient(93.12deg, #0074E4 0.52%, #4CB8E0 100%);
    --secondaryGradient: linear-gradient(268.91deg, #0074E4 -2.14%, #4CB8E0 99.69%);
    --primaryBoxShadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
    --secondaryBoxShadow: 0px -10px 15px rgba(0, 0, 0, 0.1);
    --primary: #0074E4;
}

.chatbox {
    position: fixed !important;
    bottom: 30px !important;
    right: 30px !important;
    z-index: 1000 !important;
}

/* CONTENT IS CLOSE */
.chatbox__support {
    display: flex !important;
    flex-direction: column !important;
    background: #eee !important;
    width: 450px !important;
    height: 600px !important;
    z-index: -123456 !important;
    opacity: 0 !important;
    transition: all .5s ease-in-out !important;
}

/* CONTENT IS OPEN */
.chatbox--active {
    transform: translateY(-40px) !important;
    z-index: 123456 !important;
    opacity: 1 !important;

}

/* BUTTON */
.chatbox__button {
    text-align: right !important;
}

.send__button {
    padding: 6px !important;
    background: transparent !important;
    border: none !important;
    outline: none !important;
    cursor: pointer !important;
}

/* HEADER */
.chatbox__header {
    position: sticky !important;
    top: 0 !important;
}

/* MESSAGES */
.chatbox__messages {
    margin-top: auto !important;
    display: flex !important;
    overflow-y: scroll !important;
    flex-direction: column-reverse !important;
}

.messages__item {
    background: orange !important;
    max-width: 80% !important;
    width: fit-content !important;
}

.messages__item--operator {
    margin-left: auto !important;
}

.messages__item--visitor {
    margin-right: auto !important;
}

/* FOOTER */
.chatbox__footer {
    position: sticky !important;
    bottom: 0 !important;
}

.chatbox__support {
    background: white !important;
    height: 700px !important;
    width: 450px !important;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1) !important;
    border-top-left-radius: 20px !important;
    border-top-right-radius: 20px !important;
    border-bottom-left-radius: 10px !important;
    border-bottom-right-radius: 10px !important;
}

/* HEADER */
.chatbox__header {
     background: var(--primaryGradient) !important;
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 15px 20px !important;
    border-top-left-radius: 20px !important;
    border-top-right-radius: 20px !important;
    box-shadow: var(--primaryBoxShadow) !important;
}

.chatbox__image--header {
    margin-right: 10px !important;
}

.chatbox__heading--header {
    font-size: 1.2rem !important;
    color: white !important;
}

.chatbox__description--header {
    font-size: .9rem !important;
    color: white !important;
}

/* Messages */
.chatbox__messages {
    padding: 0 20px !important;
}

.messages__item {
    font-size: 13px !important;
    white-space: pre-wrap !important;
    margin-top: 10px !important;
    background: #F4F6F8 !important;
    padding: 8px 12px !important;
    max-width: 70% !important;
    line-height: 1.5 !important;
}

.messages__item--visitor,
.messages__item--typing {
    border-top-left-radius: 20px !important;
    border-top-right-radius: 20px !important;
    border-bottom-right-radius: 20px !important;
}

.messages__item--operator {
    border-top-left-radius: 20px !important;
    border-top-right-radius: 20px !important;
    border-bottom-left-radius: 20px !important;
    background: var(--primary) !important;
    color: white !important;
    word-wrap: break-word !important;
}

/* FOOTER */
.chatbox__footer {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
    padding: 20px 20px !important;
    background: var(--secondaryGradient) !important;
    box-shadow: var(--secondaryBoxShadow) !important;
    border-bottom-right-radius: 10px !important;
    border-bottom-left-radius: 10px !important;
    margin-top: 20px !important;
}

.chatbox__footer input {
    width: 80% !important;
    border: none !important;
    padding: 10px 10px !important;
    border-radius: 30px !important;
    text-align: left !important;
}

.chatbox__send--footer {
    color: white !important;
}

.chatbox__button button,
.chatbox__button button:focus,
.chatbox__button button:visited {
    padding: 10px !important;
    background: white !important;
    border: none !important;
    outline: none !important;
    border-top-left-radius: 50px !important;
    border-top-right-radius: 50px !important;
    border-bottom-left-radius: 50px !important;
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1) !important;
    cursor: pointer !important;
}

.email__button {
    text-align: center !important;
    margin-top: 20px !important;
}

.email__button__send {
    border: none !important;
    background: none !important;
    text-decoration: underline !important;
    cursor: pointer !important;
    font-size: .9rem !important;
}


`;
        document.head.appendChild(style);

        // inject HTML
        document.body.innerHTML += `<!-- a div contains the chatbot -->
<div class="cb_container">
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
            <div class="email__button">
                <button class="email__button__send">Contact the Recruiter</button>
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

    static BASE_URL = 'http://127.0.0.1:5000';
    static emailRecipient = 'xxxxxx@xxx.com';

    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            emailButton: document.querySelector('.email__button')
        }

        //toggle the chatbot
        this.state = false;

        //store messages history
        this.messages = [];

        //add initial message
        this.initialMessageDisplayed = false;
    }

    display() {
        const {openButton, chatBox, sendButton, emailButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox));
        sendButton.addEventListener('click', () => this.onSendButton(chatBox));
        emailButton.addEventListener('click', () => this.onEmailButton());

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
        const initialMsg = "Hello! I'm your Job Matching Assistant. I can help you find the perfect job opportunity " +
        "from our job data. Just let me know what you're looking for, such as 'registered nurse positions in New York'. " +
        "If you have questions about specific jobs or the application process, feel free to contact our recruiter at " +
        "xxxxxx@xxx.com";

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

    //show the message and send it
    async onSendButton(chatbox) {
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
            sessionId = "uniqueID_" + Math.random().toString(36).substr(2, 9);  // random ID
            localStorage.setItem("sessionId", sessionId);
        }

        // 1. update chat text, show user's input
        this.updateChatText(chatbox);

        // 2. show a loading message
//        let loadingMsgHTML = '<div class="dotPulseWrapper"><div class="dotPulse"></div><div class="dotPulse"></div><div class="dotPulse"></div></div>';
//        let loadingMsg = { name: "Chatbot", message: loadingMsgHTML, type: "loading" };
//        this.messages.push(loadingMsg);
//        this.updateChatText(chatbox);

        // empty input
        textField.value = '';

        try {
            const response = await fetch(`${Chatbox.BASE_URL}/predict`, {
                method: 'POST',
                body: JSON.stringify({ message: text1, sessionId: sessionId }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            const newMsg = {name: "Chatbot", message: "" };
            this.messages.push(newMsg)
            while (true) {
              const {done, value} = await reader.read();
              if (done) break;
              const text = decoder.decode(value);
              let msg2 = this.messages.pop()
              msg2.message = msg2.message + text;
              this.messages.push(msg2);
              this.updateChatText(chatbox)
            }
        } catch (error) {
            console.error(error)
        }
    }

    updateChatText(chatbox) {
        const chatmessage = chatbox.querySelector('.chatbox__messages');

        while (chatmessage.firstChild) {
            chatmessage.removeChild(chatmessage.firstChild);
        }

        this.messages.slice().reverse().forEach(function(item, index) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('messages__item');

            if (item.name === "Chatbot") {
                messageElement.classList.add('messages__item--visitor');
            } else {
                messageElement.classList.add('messages__item--operator');
            }

            const textNode = document.createTextNode(item.message);
            messageElement.appendChild(textNode);
            chatmessage.appendChild(messageElement);
        });

        chatmessage.scrollTop = chatmessage.scrollHeight;
    }


    onEmailButton() {

        const emailSubject = 'Job Inquiry From ChatBot';

        const mailtoLink = `mailto:${Chatbox.emailRecipient}?subject=${emailSubject}`;

        // open user's mail client
        window.location.href = mailtoLink;
    }
}


const chatbox = new Chatbox();
chatbox.display();
    