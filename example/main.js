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