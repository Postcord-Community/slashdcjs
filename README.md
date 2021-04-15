# Discord Slash Commands


## Examples

### Command
```js
module.exports = {
    name: "ping",
    description: "Ping Pong",
    options: null, /*or []*/

    run: async (interaction, client) => {

    }
}
```

### Interaction Run
```js
    client.ws.on("INTERACTION_CREATE", async (interaction) => {
        if(client.commands.has(interaction.data.name)) {
            try {
                client.commands.get(interaction.data.name).run(interaction, client);
            } catch (error) {
                console.log(error)
            }
        } else return;
    })
```


## Ping Command 
```js
module.exports = {
    name: "ping",
    description: "Ping Pong",
    options: null, /*or []*/

    run: async (interaction, client) => {
        await client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                content: "Pong"
            }
        })
    }
}
```


## Examples Main File 
```js
const DiscordJS = require('discord.js'); // DiscordJS 
const Dclient = new DiscordJS.Client // DiscordJS new client
const SlashClient = require("slashdcjs"); // Slashdcjs

const Sclient = new SlashClient({ 
    client: Dclient, // Your bot client
    commandFolder: "./commands", // Your command folder path
    clientID: "656165298818514946", // Your bot ID
 }); // Slashdcjs new client

 
/* Interaction Run */
Dclient.ws.on("INTERACTION_CREATE", async (interaction) => {
    if(Dclient.commands.has(interaction.data.name)) {
        try {
            Dclient.commands.get(interaction.data.name).run(interaction, Dclient);
        } catch (error) {
            console.log(error)
        }
    } else return;
});

Sclient.startSlashCommands();
Dclient.login("(╯°□°）╯︵ ┻━┻") // Your bot token
```