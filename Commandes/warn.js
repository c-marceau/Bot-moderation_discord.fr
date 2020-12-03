const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Tu n'as pas `KICK_MEMBERS` permission.");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if (wUser === message.author) return message.channel.send("Es tu attardé ? Pourquoi veux-tu te warn ?")
  if (!wUser) return message.reply("Impossible de trouver l'utilisateur.");
  let reason = args.join(" ").slice(22);
  if (!reason) return message.channel.send("Veuillez fournir une raison!")
  if (!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
    .setTitle("Warn")
    .setColor("#fc6400")
    .addField("User", `${wUser.user.tag}`)
    .addField("Moderator", `${message.author.tag}`)
    .addField("Nombre de Warnings", warns[wUser.id].warns)
    .addField("Raison", `${reason ? reason : "Aucun."}`);

  let warnchannel = message.guild.channels.find(`name`, "mod-logs");
  if (!warnchannel) return message.channel.send("Impossible de trouver le canal `mod-log`**");
  warnchannel.send(warnEmbed);
  wUser.send(warnEmbed);
  message.channel.send("Cet utilisateur a été averti.")


}

module.exports.help = {
  name: "warn"
}