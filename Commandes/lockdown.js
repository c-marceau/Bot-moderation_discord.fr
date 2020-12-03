var Discord = require("discord.js");
const ms = require("ms");
  exports.run = async (bot, message, args = []) => {

    if(message.member.hasPermission("MANAGE_GUILD")) {

    if (!bot.lockit) bot.lockit = [];
  
    let time = args.join(' ')
    let validUnlocks = ['release', 'unlock'];
    var notimeembed = new Discord.RichEmbed()
    .setTitle('Error')
    .setDescription("👾 Vous devez définir une durée pour le verrouillage en heures, minutes ou secondes")  
    .setColor('36393e')
    if (!time) return message.channel.send(notimeembed);

    if (validUnlocks.includes(time)) {
      message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: null
      }).then(() => {
        var liftedembed = new Discord.RichEmbed()
        .setTitle('🔒 Verrouillé')
        .setDescription("🔓 Verrouillage levé.")  
        .setColor('36393e')
        message.channel.send(liftedembed);
        clearTimeout(bot.lockit[message.channel.id]);
        delete bot.lockit[message.channel.id];
      }).catch(error => {
        console.log(error);
      });
    } else {
      message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      }).then(() => {
        var lockdownembed = new Discord.RichEmbed()
        .setTitle("🔒 Chaîne verrouillée")
        .addField("Verrouillé par", `${message.author}`, true)
        .addField("Verrouillé pour", `${ms(ms(time), { long:true })}`, true)
        .setColor('36393e')
        message.channel.send(lockdownembed).then(() => {

          bot.lockit[message.channel.id] = setTimeout(() => {
            var liftedembed = new Discord.RichEmbed()
            .setTitle('🔒 Verrouillé')
            .setDescription("🔓 Verrouillé levé.")  
            .setColor('36393e') 
            message.channel.overwritePermissions(message.guild.id, {
              SEND_MESSAGES: null
            }).then( 
               
              message.channel.send(liftedembed)).catch(console.error);
            delete bot.lockit[message.channel.id];
          }, ms(time));

        }).catch(error => {
          console.log(error);
        });
      });
    }

    } else {
        var nopermsembed = new Discord.RichEmbed()
        .setTitle('Error')
        .setDescription("👾 Permissions manquantes :: MANAGE_SERVER")  
        .setColor('36393e')
        message.channel.send(nopermsembed)
    }




};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "lockdown",
  description: "locks the channel down",
  category: "administration",
  usage: " lockdown <time>"
};