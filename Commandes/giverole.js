const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //!addrole <@user> <Role>
  if(args[0] == "help"){
    let helpembxd = new Discord.RichEmbed()
    .setColor("#00ff00")
    .addField("Addrole Command", "Usage: !addrole <@user> <role>")

    message.channel.send(helpembxd);
    return;
  } 

  let xdemb = new Discord.RichEmbed()
  .setColor("#00ff00")
  .setTitle(`Addrole command`)
  .addField("Description:", "Ajouter un rôle au membre", true)
  .addField("Usage", "!addrole [user] [role]", true)
  .addField("Exemple", "!addrole @Marceau Membre")

  if(message.author.id !== '209802617096896512') return message.channel.send("Vous n'avez pas les autorisations pour faire ça!");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.channel.send(xdemb);

  let role = args.join(" ").slice(22);
  if(!role) return message.channel.send("Spécifiez un rôle !");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.channel.send("Impossible de trouver ce rôle.");

  if(rMember.roles.has(gRole.id)) return message.channel.send("Cet utilisateur a déjà ce rôle.");
  await(rMember.addRole(gRole.id));

    await message.channel.send(`***Je viens de donner ${rMember.user.username} le ${gRole.name} role !***`)

    message.delete();
  
}

module.exports.help = {
  name: "addrole",
  description: 'Add role to someone',
  usage: 'addrole <@user> <Role>'
}