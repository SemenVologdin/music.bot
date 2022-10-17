require('dotenv').config({path: './.env'})
const {Telegraf} = require('telegraf')
const ytdl = require('ytdl-core')
const fs = require('fs')

const token = process.env.BOT_TOKEN

if( !token ){
    throw new Error('Token is not provided!')
}

const bot = new Telegraf(token)

bot.start((ctx)=>{
    ctx.reply('Hello, i\'m a music bot. \nSend me a Youtube URL, and i reply his audio!')
})

bot.on('message', (ctx) =>{
    const baseUrl = '/watch?v='
    const url = ctx.message.toString()
    if( !url.search( baseUrl ) ){
        ctx.reply('URL is not valid, please send a valid URL')
        return
    }else{

        ytdl(url, {
            filter: function (format) {
                return format.quality== "highest";
            },
        }).pipe(fs.createWriteStream('video.mp4'));

    }
})

bot.launch()