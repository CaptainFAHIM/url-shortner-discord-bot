require("dotenv").config();
const {Client, GatewayIntentBits} = require("discord.js");
const axios = require("axios");
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent],
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"]
});

// Variables
//Commands
const prefix = "/";

client.on("ready", (client) => {
    console.log(`Url-shortner is online ${client.user.tag}`);
});
client.on("messageCreate", async (message) => {
    if(!message.author.bot){
        if(message.content.toLowerCase().startsWith(`${prefix}cshort`)){
            const args = message.content.split(" ");
            if (args.length !== 2) {
                message.channel.send('Please provide a valid YouTube URL.');
                return;
              }
              const url = args[1];
              try {
                const response = await axios.post(`https://ulvis.net/API/write/get?url=${url}&private=1`);
                message.reply(response.data.data.url);
              } catch (error) {
                console.log(error.message);
              }
            
        }
        
    }
    
});

client.login(process.env.TOKEN);