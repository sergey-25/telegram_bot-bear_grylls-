const TelegramApi = require('node-telegram-bot-api');
const { gameOptions, againOptions } = require('./options');

const token = '5060920583:AAHCHNj4FOIH6NaNzOclk63R1VPWPJ-8aJM'


const bot = new TelegramApi(token, { polling: true });

const chats = {};







const startGame = async (chatId) => { 
 await bot.sendMessage(chatId, `Сейчас я загадаю число от 0 до 9, а ты должен отгадать`)
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = randomNumber;
            await bot.sendMessage(chatId, `Отгадывай`, gameOptions);
}

const start = () => {

    bot.setMyCommands([
        { command: '/start', description: 'Приветствие' },
        { command: '/info', description: 'Описание' },
         { command: '/game', description: 'Игра отгадай цыфру' }
    ]);

    bot.on('message', async msg => {
        const text = msg.text;

        const chatId = msg.chat.id;

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/115/1e9/1151e912-093e-302c-a0fc-58ee587c4e05/5.webp')
            return bot.sendMessage(chatId, `Здоровля, это тестовый телеграм бот что-бы, менеджерить наши походы`)
        };

        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
        };
        if (text === '/game') {
                 return startGame(chatId)
        }
        
        return bot.sendMessage(chatId, 'Хуйло з баштана');
        console.log(msg);
 
    });

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data ==='/again') {
            return startGame(chatId)
        }

        if (data === chats[chatId]) {
           return bot.sendMessage(chatId, `Поздравляю ты выбрал цыфру ${chats[chatId]}`, againOptions)
        } else {
            return bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цыфру ${chats[chatId]}`, againOptions)
        }

        console.log(msg)
    })
   
};
start();