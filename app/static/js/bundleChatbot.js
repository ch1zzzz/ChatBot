const fs = require('fs');
const concat = require('concat');

async function bundleChatbot() {
    // 读取文件内容
    const cssContent = fs.readFileSync('app/static/css/style.css', 'utf-8');
    const htmlContent = fs.readFileSync('app/templates/chatFragment.html', 'utf-8');
    const jsContent = fs.readFileSync('app/static/js/app.js', 'utf-8');
    // 创建最终的嵌入脚本
    const embedContent = `
        // 注入CSS
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = \`${cssContent}\`;
        document.head.appendChild(style);

        // 注入HTML
        document.body.innerHTML += \`${htmlContent}\`;

        // 注入JS
        ${jsContent}
    `;

    // 将生成的脚本保存为新文件
    fs.writeFileSync('app/static/js/chatbotEmbed.js', embedContent);

    console.log("Chatbot bundle created!");
}

bundleChatbot();
