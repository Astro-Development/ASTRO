const Discord = module.require("discord.js");

module.exports = {
    name: "suggest",
    description: "Suggest Features for Astro",
    run: async(client, message, args) => {
        const avatar = message.author.avatarURL;
        const suggestchannel = client.channels.cache.get("851915356426862602")
        const suggestion = args.join(" ");
        if (!suggestion) {
        return message.channel.send("Please Suggest Something");
        }
        message.channel.send("Thanks for Suggesting Features for Astro. Our Mod team will inform you if your Suggestion is accepted or not!")
        const embed = new Discord.MessageEmbed()
        .setAuthor(`New Suggestion!`, avatar)
        .setDescription(`${suggestion} \n\nBy: ${message.author.tag}`)
        .setFooter(`ID: ${message.author.id}`)
        .setColor("RANDOM");

        suggestchannel.send(embed);
    }, catch (error) {
        const errorlogs = client.channels.cache.get("851910212159406140")
        message.channel.send("Looks like an error has occured. The error has been reported to the Report Section")
        errorlogs.send(`Error in Suggest Command! \nError: \n`+error)
    }
}