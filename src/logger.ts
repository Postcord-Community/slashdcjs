import { yellow, redBright, blueBright } from 'chalk';
import { utc } from 'moment'

export class logger {
    static async send(type: string, content: string) {
        console.log(`${yellow(`[${utc().format("LLL")}]`)} ${redBright(`[${type.toUpperCase()}]`)} ${blueBright(content)}`)
    }
}