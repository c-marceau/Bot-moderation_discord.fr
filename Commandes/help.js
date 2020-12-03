var Discord = require("discord.js");
var client = new Discord.Client();
var pageMenu = require("@quantiom/pagemenu");

exports.run = (client, message, args) => {
  let pMenu = new pageMenu(
    message,
    [{
        title: "Help | Commands",
        description: "Page 1",
        thumbnail: `${client.user.avatarURL}`,
        color: "66cdaa", // green
        fields: [{
            name: "ping",
            value: "Renvoie la latence et le ping Websocket.",
            inline: true
          },
          {
            name: "info",
            value: "Renvoie des informations sur le bot, y compris la disponibilité et le nombre d'utilisateurs.",
            inline: true
          },
          {
            name: "help",
            value: "Renvoie des informations sur les commandes de bot.",
            inline: true
          },
          {
            name: "bugreport",
            value: "Soumettre un rapport de bogue pour examen. Exemple: >bugreport (reason).",
            inline: true
          },
          {
            name: "warn",
            value: "Warns un utilisateur.",
            inline: true
          }
        ]
      },
      {
        title: "Help | Commands",
        description: "Page 2",
        thumbnail: `${client.user.avatarURL}`,
        color: "66cdaa", // green
        fields: [{
            name: "warnlvl",
            value: "Vérifier le niveau d'avertissement d'un utilisateur.",
            inline: true
          },
          {
            name: "kick",
            value: "Exlure un utilisateur.",
            inline: true
          },
          {
            name: "tempmute",
            value: "Mute un utilisateur pendant une durée spécifiée.",
            inline: true
          },
          {
            name: "ban",
            value: "Bans un utilisateur.",
            inline: true
          },
          {
            name: "unban",
            value: "Unban un utilisateur.",
            inline: true
          }
        ]
      },
      {
        title: "Help | Commands",
        description: "Page 3",
        thumbnail: `${client.user.avatarURL}`,
        color: "66cdaa", // green
        fields: [{
            name: "serverinfo",
            value: "Affiche des informations sur le serveur.",
            inline: true
          },
          {
            name: "userinfo",
            value: "Affiche des informations sur un utilisateur.",
            inline: true
          },
          {
            name: "softban",
            value: "Softban un utilisateur, en supprimant ses messages pendant 7 jours, puis en lui permettant de rejoindre immédiatement.",
            inline: true
          },
          {
            name: "purge",
            value: "Supprime un nombre spécifié de messages.",
            inline: true
          },
          {
            name: "lockdown",
            value: "Verrouiller une chaîne pendant une durée spécifiée.",
            inline: true
          },
        ]
      },
      {
        title: "Help | Commands",
        description: "Page 4",
        thumbnail: `${client.user.avatarURL}`,
        color: "66cdaa", // green
        fields: [{
            name: "kill",
            value: "Tuez un utilisateur ou vous-même. Compte le nombre de victimes par utilisateur.",
            inline: true
          },
          {
            name: "hug",
            value: "Embrassez un utilisateur, compte combien de câlins par utilisateur.",
            inline: true
          },
          {
            name: "meme",
            value: "Génère un mème aléatoire à partir de /r/dankmemes.",
            inline: true
          },
          {
            name: "pewds",
            value: "Génère un mème aléatoire à partir de /r/pewdiepie.",
            inline: true
          }
        ]
      },

    ], {
      duration: 60000,
      expireFunction: function (msg) {
        msg.delete();
      }
    }
  );

  pMenu.run();
};