const Discord = require("discord.js");
const BOT_TOKEN = require("./secret.js");
var secToMin = require("sec-to-min");
const bot = new Discord.Client();

discordStatus = {
  0: "READY",
  1: "CONNECTING",
  2: "RECONNECTING",
  3: "IDLE",
  4: "NEARLY",
  5: "DISCONNECTED"
};

bot.on("ready", () => {
  console.log("I am ready!");
  console.log(bot.pings);
  let channel = bot.channels.get("242756886338732033");
  channel.send(
    "I am turned on! my current status is " + discordStatus[bot.status]
  );
});

bot.on("disconnect", () => {
  console.log("I am turning off!");
});

bot.on("message", message => {
  if (message.content === "!ping") {
    message.reply("DISCORD'S current ping is: " + bot.ping);
  }
});

bot.on("message", message => {
  if (message.content === "!uptime") {
    message.reply(secToMin(Math.floor(bot.uptime / 1000)));
  }
});

bot.on("guildMemberAdd", member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find("name", "member-log");
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to Matt's Lounge, ${member}`);
});

bot.login(BOT_TOKEN);
