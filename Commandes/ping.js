var now = require('performance-now');
exports.run = (client, message, args) => {
  var pStart = now();
  message.channel.send("Vérification du ping...").then(message => {
    var pEnd = now();
    message.edit("La latence actuelle est " + (pEnd - pStart).toFixed(2) + " ms et le ping actuel du websocket est " + client.ping.toFixed(0) + ".");
  }).catch(error => console.log("Erreur lors de l'exécution de la commande ping :\n"));
};
