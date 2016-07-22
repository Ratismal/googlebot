"use strict";
var http = require('http');
var fs = require('fs');
var request = require('request');

module.exports = {
    main: function(bot, msg, settings) {
        var args = msg.content.split(' ');
        args.splice(0, 2);
        var url = "https://g.1536.cf/user/id/"+args[0]+"/"+settings.config.internalkey;
        request(url, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              var user = JSON.parse(body);
              user.game = user.game!=null ? user.game : {"name": "None", "type": 0}
              var final = `\`\`\`xl
Username: ${user.username}
 Discrim: ${user.discriminator}
      ID: ${user.id}
  Status: ${user.status}
  Avatar: ${user.avatar}
     Bot: ${user.bot}
    Game: ${user.game.name} (Streaming: ${user.game.type})
\`\`\``
              bot.sendMessage(msg, final);
          } else {
              bot.sendMessage(msg, "Error: "+error);
          }
        });
    },
    help: '',
    args: ''
};