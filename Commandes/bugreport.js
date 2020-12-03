const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
let bug = args.join(" ").slice(0);
let user = message.author.username;
let guild = message.guild.name;
let channel = bot.channels.get("571873575179649034")
let embed = new Discord.RichEmbed()
.setTitle("Rapport d'erreur")
.setThumbnail("https://images-ext-1.discordapp.net/external/nQoe_5zRdR6A5gsh2fevRbNvhoc5A2YIWP7zVdN5_NE/%3Fv%3D1/https/cdn.discordapp.com/emojis/435908220100280320.png?width=80&height=80")
.addField("Bug", bug)
.addField("Rapporté par", user)
.addField("Signalé dans", guild)
.setColor("#f49542")

message.channel.send("**| Votre bug a été signalé sur le serveur officiel. Il sera examiné, alors soyez patient.**")
channel.send(embed).then(i => i.react("⏳"))

  


}
module.exports.help = {
name: "bugreport"
}