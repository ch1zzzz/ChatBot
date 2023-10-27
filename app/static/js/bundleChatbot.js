const fs = require('fs');
const concat = require('concat');

async function bundleChatbot() {
    // read content
    const cssContent = fs.readFileSync('app/static/css/style.css', 'utf-8');
    const htmlContent = fs.readFileSync('app/templates/chatFragment.html', 'utf-8');
    const jsContent = fs.readFileSync('app/static/js/app.js', 'utf-8');
    // create final script
    const embedContent = `
        // inject CSS
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = \`${cssContent}\`;
        document.head.appendChild(style);

        // inject HTML
        document.body.innerHTML += \`${htmlContent}\`;

        // inject JS
        ${jsContent}
    `;

    // save script
    fs.writeFileSync('app/static/js/chatbotEmbed.js', embedContent);

    console.log("Chatbot bundle created!");
}

bundleChatbot();
