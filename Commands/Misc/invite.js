const Discord = require("discord.js");

module.exports = {
    name: "invite",
    description: "Get the bot's",
    run: async (client, message, args) => {

        let embed = new Discord.MessageEmbed()
        .setTitle("Invite Me")
        .setColor("RANDOM")
            .setDescription("Get Astro's Invite Link [Here]()\n Need assistance? Join our [Support Server](https://discord.gg/mqWprFc) now!")
        .setFooter(`Requested By: ${message.author.username}`);
        message.channel.send(embed);
    }
}
