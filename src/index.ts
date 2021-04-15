import { Client, Collection } from 'discord.js';
import { EventEmitter } from 'events';
import { readdirSync } from 'fs'
import { logger } from './logger';
const event = new EventEmitter();

export interface IParams {
    client: string | any | Client;
    commandFolder: string;
    clientID: number
}


export interface ICommand {
    name: string,
    description: string,
    options: string[] | null
}

export class SlashClient {
    params: IParams

    constructor(params: IParams) {
        this.params = params;

        if(!this.params.client) {
            throw new Error("You need to specify a new Discord Client")
        }

        if(!this.params.commandFolder) {
            throw new Error("You need to specify the slash commands file")
        }
    }

    async startSlashCommands() {
        event.emit("ready", this.settingSlashCommands())
    }
    public async settingSlashCommands() {
        this.params.client.slashCommands = new Collection();
        try {
            var slashFolders: string[] = await readdirSync(`${process.cwd()}/${this.params.commandFolder}`);

            if(slashFolders) {
                for (var slashFolder of slashFolders) {
                    var slashCommand: ICommand = require(`${process.cwd()}/${this.params.commandFolder}/${slashFolder}`)
    
                    await this.params.client.api.applications(this.params.clientID).commands.post({
                        data: {
                            name: slashCommand.name,
                            description: slashCommand.description,
                            options: slashCommand.options,
                        }
                    });
                    this.params.client.slashCommands.set(slashCommand.name, slashCommand)
                    logger.send("command", `${slashCommand.name} slash command successfully processed. (${slashFolder})`)
                }
            }
        } catch (error) {
            throw error;
        } 
    }
}