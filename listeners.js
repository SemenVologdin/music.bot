import ytdl from "ytdl-core";

export function onStart(ctx){
    ctx.reply('Hello, i\'m a music bot. \nSend me a Youtube URL, and i reply his audio!')
}

export async function onMessage(ctx){
    const baseUrl = '/watch?v='
    const url = ctx.message.text
    if( !url.search( baseUrl ) ){
        ctx.reply('URL is not valid, please send a valid URL')
        return
    }

    const info = await ytdl.getInfo(url)
    const title = `${info.videoDetails.author.name} ${info.videoDetails.title}`

    const stream = await ytdl(url, { filter: 'audioonly' })

    await ctx.replyWithAudio({source: stream})
    await ctx.deleteMessage()
}