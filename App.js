import dotenv from 'dotenv'
import {Telegraf} from 'telegraf'
import {Listener} from './Listener.js'

export class App{
    token = '';

    constructor() {
        dotenv.config({path: './.env'})
        this.token = process.env.BOT_TOKEN

        if( !this.token ){
            throw new Error('Token is not provided!')
        }
    }

    start(){
        this.bot = new Telegraf(this.token)
        this.listener = new Listener(this.bot)

        this.listener.addEvents()
        this.bot = this.listener.getBot()
        this.bot.launch()
    }
}