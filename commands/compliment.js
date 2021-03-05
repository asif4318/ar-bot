const axios = require("axios");

module.exports = {
  name: "compliment",
  description: "Fetches compliment",
  async execute(message) {
    let getCompliment = async () => {
        let response = await axios.get("https://complimentr.com/api");
        let compliment = response.data.compliment;
        return compliment;
      };
  
      if (message.mentions.users.first() === undefined) {
        taggedUser = "";
      } else {
        taggedUser = message.mentions.users.first();
      }
  
      let complimentValue = await getCompliment();
      let reply = complimentValue + ` ${taggedUser}`;
      message.channel.send(reply);
  },
};
