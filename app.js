require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
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
  if (!message.author.bot) {
    if (message.content.toLowerCase().startsWith(`${prefix}cshort`)) {
      const args = message.content.split(" ");
      if (args.length !== 2) {
        message.channel.send('Please provide a valid URL.');
        return;
      }
      const url = args[1];

        var myHeaders = new Headers();
        myHeaders.append("apikey", process.env.API_KEY);

        var raw = url;

        var requestOptions = {
          method: 'POST',
          redirect: 'follow',
          headers: myHeaders,
          body: raw
        };

        fetch("https://api.apilayer.com/short_url/hash", requestOptions)
          .then(response => response.json())
          .then(result => {
            message.reply(result.short_url);
          })
          .catch(error => console.log('error', error));
      
    }

  }

});

client.login(process.env.TOKEN);