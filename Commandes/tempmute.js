const Discord = require("discord.js");
const ms = require("ms");
module.exports.run = async (bot, message, args) => {


  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No can do.");
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply("Please supply a reason.");

  let muterole = message.guild.roles.find(`name`, "muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");

  message.delete().catch(O_o=>{});

  try{
    await tomute.send(`Salut ! Tu as été mis en mute pendant ${mutetime}. Désolé !`)
  }catch(e){
    message.channel.send(`Un utilisateur a été mute... mais leurs DM sont verrouillés. Ils seront mis en mute pendant ${mutetime}`)
  }

  let muteembed = new Discord.RichEmbed()
  .setDescription(`Muet exécuté par ${message.author}`)
  .setColor("#0000000")
  .addField("Mute Utilisateur", tomute)
  .addField("Muted dans", message.channel)
  .addField("Time", message.createdAt)
  .addField("Longueur", mutetime)
  .addField("Raison", reason);

  let channel = message.guild.channels.find(c => c.name === "mod-logs");
  if(!channel) return message.reply("Veuillez d'abord créer un canal d'incidents !");
  channel.send(muteembed);

  await(tomute.addRole(muterole.id));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "tempmute"
}