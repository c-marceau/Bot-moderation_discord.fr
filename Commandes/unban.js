const n = require("../n.json");
const Discord = require("discord.js");
const human = require('humanize');
exports.run = (client, message, args) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!client.hasPermission("BAN_MEMBERS")) return;
  if (!message.member.hasPermission("BAN_MEMBERS") && message.author.id !== n.oID) {
    message.channel.send("Vous n'avez pas la permission(s): Ban Members.");
  } else {
    let time = new Date();
    function amPm() {
      if (time.getHours() >= 11) {
        return "PM";
      } else return "AM";
    }
    var testCont = message.content.split(" ");
    var content = message.content.split(" ").slice(2).join(' ');
    var args1 = message.content.split(" ").slice(1);
    var unbanned = args1[0];
    if (testCont.length <=1) {
      message.channel.send("Veuillez fournir un identifiant de l'utilisateur à unban !");
    } else if (testCont.length <= 2) {
      message.channel.send("Veuillez fournir une raison pour unban.");
    } else {
      message.guild.unban(unbanned).then(() => {
        var embed = new Discord.RichEmbed()
        .setTitle("Unban")
        .setDescription(`Unbanned ${unbanned} (ID).`)
        .setAuthor(message.author.username + "#" + message.author.discriminator, `${message.author.avatarURL}`)
        .addField("Temps",
          `Unban a eu lieu à ${human.date('m-d-y | h:i:s', new Date())} ${amPm()}`)
        .addField("Moderator",
          `Unban administré par ${message.author.username}#${message.author.discriminator}`)
        .addField("Raison",
          `${content}`)
        .setColor("#008000")
        .setTimestamp()
        message.channel.send(embed);
      });
    }
  }
}