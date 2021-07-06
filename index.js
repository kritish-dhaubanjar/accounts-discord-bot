require("dotenv").config();
const axios = require("axios");
const Discord = require("discord.js");

const client = new Discord.Client();

const currencyFormatter = Intl.NumberFormat("en-IN");

client.on("ready", () => {
  console.log("strongB0x-discord-bot ready!");
});

client.on("message", (message) => {
  if (message.content === "&account") {
    axios
      .get(process.env.API, {
        headers: {
          Authorization: `Bearer ${process.env.AUTHORIZATION_TOKEN}`,
        },
      })
      .then(({ data }) => {
        const reply = new Discord.MessageEmbed();

        reply.setTitle("Accounts & Balance");

        const accounts = Object.keys(data);
        let total = 0;

        for (const account of accounts) {
          total += data[account];
          reply.addField(
            account,
            `NPR ${currencyFormatter.format(data[account])}`
          );
        }

        reply.addField("Total", `NPR ${currencyFormatter.format(total)}`);

        message.channel.send(reply);
      });
  }
});

client.login(process.env.DISCORD_TOKEN);
