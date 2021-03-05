const axios = require("axios");

module.exports = {
	name: 'insult',
	description: 'An insult generator',
	async execute(message) {
		let getInsult = async () => {
            let response = await axios.get("https://insult.mattbas.org/api/insult");
            let insult = response.data;
            return insult;
          };
          if (message.mentions.users.first() === undefined) {
            taggedUser = "";
          } else {
            taggedUser = message.mentions.users.first();
          }
      
          let insultValue = await getInsult();
          let reply = insultValue + ` ${taggedUser}`;
          message.channel.send(reply);
	},
};