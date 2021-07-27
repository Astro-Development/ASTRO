const Discord = require("discord.js");

module.exports = {
  name: "commandcount",
  aliases: ["ccount"],
  description: "Gives the total amount of commands for the bot",
  run: async (client, message, args) => {
    message.channel.send('I currently have 21 commands! Use `%help` to find out what those commands are') 
  }
}