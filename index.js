// Requiring our Discord Packages
const {Collection, Client, Discord, MessageEmbed} = require('discord.js')
const client = new Client({
    disableEveryone: false,
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_PRESENCES']
});

// Setting up a simple server
var http = require('http');  
http.createServer(function (req, res) {   
  res.write("I'm alive");   
  res.end(); 
}).listen(8080);

// Requiring Database Packages
const db = require('quick.db')
const mongoose = require('mongoose')

// Requiring the native file system
const fs = require('fs')
const path = require('path')

// Requiring Stuff from our Colors Folder


// Varibles telling the bot we need this stuff
const config = require('./config.json')
const prefix = config.BotInfo.Default_Prefix

// Creating our collections of commands, aliases, timeouts, & categories 
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./Commands/");
["command"].forEach(handler => {
    require(`./Handlers/${handler}`)(client);
}); 

// Console logging the bot is online as well as sets the activty of the bot
client.on('ready', () => {
    client.user.setActivity(`${prefix}help`)
    console.log(`${client.user.username} ✅`)
})

// Runs safety checks on the bot 
client.on('message', async message =>{
    if(message.author.bot) return;
    
    // Afk status command
    if(db.has(`afk-${message.author.id}+${message.guild.id}`)) {
        const info = db.get(`afk-${message.author.id}+${message.guild.id}`)
        await db.delete(`afk-${message.author.id}+${message.guild.id}`)
        message.reply(`Your afk status have been removed (${info})`)
    }

    //Checking for mentions
    if(message.mentions.members.first()) {
        if(db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)) {
            message.channel.send(message.mentions.members.first().user.tag + ": " + db.get(`afk-${message.mentions.members.first().id}+${message.guild.id}`))
        } else return;
    } else;

    // More safety checks
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
})

// Log into the application made in the Discord Developer Portal
client.login(process.env.DISCORD_TOKEN);