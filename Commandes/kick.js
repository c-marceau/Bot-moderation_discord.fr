const n = require("../n.json");
const Discord = require("discord.js");
const human = require('humanize');
exports.run = (client, message, args) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member.hasPermission("KICK_MEMBERS") || message.author.id !== n.oID) {
    message.channel.send("Il vous manque l'autorisation(s) : Kick Members.");
  } else {
    let time = new Date();
    function amPm() {
      if (time.getHours() >= 11) {
        return "PM";
      } else return "AM";
    }
    var testCont = message.content.split(" ");
    var content = message.content.split(" ").slice(2).join(' ');
    var kicked = message.mentions.users.first();
    if (message.mentions.users.size < 1) {
      message.channel.send("Vous devez fournir un utilisateur à exclure !");
    } else if (testCont.length <= 2) {
      message.channel.send("Veuillez fournir une raison pour kick.");
    } else if (message.guild.member(kicked).kickable) {
      client.users.get(kicked).send(`Vous avez été expulsé de ${message.guild.name} pour : ${content} par ${message.author.username}`);
      message.guild.member(kicked).kick().then(kicked => {
        var embed = new Discord.RichEmbed()
        .setTitle("Kick")
        .setDescription(`Kicked ${kicked.displayName}.`)
        .setAuthor(message.author.username + "#" + message.author.discriminator, `${message.author.avatarURL}`)
        .addField("Temps",
          `Coup de pied survenu à ${human.date('m-d-y | h:i:s', new Date())} ${amPm()}`)
        .addField("Moderator",
          `Coup de pied administré par ${message.author.username}#${message.author.discriminator}`)
        .addField("Raison",
          `${content}`)
        .setColor("#ff0000")
        .setTimestamp()
        message.channel.send(embed);
      });
    } else message.channel.send("Je ne peux pas expulsé ce membre.");
  }
}