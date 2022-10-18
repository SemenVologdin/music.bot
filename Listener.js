import {onStart, onMessage} from "./listeners.js";

export class Listener {
    constructor( bot ) {
        this.bot = bot
    }

    addEvents(){
        this.bot.on('start', onStart)
        this.bot.on('message', onMessage)
    }

    getBot(){
        return this.bot
    }

}