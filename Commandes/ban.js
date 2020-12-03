const n = require("../n.json");
const Discord = require("discord.js");
const human = require('humanize');
exports.run = (client, message, args) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member.hasPermission("BAN_MEMBERS") || message.author.id !== n.oID) {
    message.channel.send("Vous n'avez pas les autorisation(s) : Bannir des membres.");
  } else {
    let time = new Date();
    function amPm() {
      if (time.getHours() >= 11) {
        return "PM";
      } else return "AM";
    }
    var testCont = message.content.split(" ");
    var content = message.content.split(" ").slice(2).join(' ');
    var banned = message.mentions.users.first();
    if (message.mentions.users.size < 1) {
      message.channel.send("Vous devez fournir un utilisateur pour ban !");
    } else if (testCont.length <= 2) {
      message.channel.send("Veuillez fournir une raison pour ban.");
    } else if (message.guild.member(banned).bannable) {
      client.users.get(banned.id).send(`Vous avez été banni de ${message.guild.name} pour : ${content} de ${message.author.username}`);
      message.guild.member(banned).ban().then(banned => {
        var embed = new Discord.RichEmbed()
        .setTitle("Ban")
        .setDescription(`Banni ${banned.displayName}.`)
        .setAuthor(message.author.username + "#" + message.author.discriminator, `${message.author.avatarURL}`)
        .addField("Temps",
          `Ban s'est produit à ${human.date('m-d-y | h:i:s', new Date())} ${amPm()}`)
        .addField("Moderator",
          `Ban administré par ${message.author.username}#${message.author.discriminator}`)
        .addField("Raison",
          `${content}`)
        .setColor("#ff0000")
        .setTimestamp()
        message.channel.send(embed);
      });
    } else message.channel.send("Je ne peux pas bannir ce membre.");
  }
}