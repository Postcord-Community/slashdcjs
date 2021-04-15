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