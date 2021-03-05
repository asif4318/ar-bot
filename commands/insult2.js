const axios = require("axios");

module.exports = {
  name: "insult2",
  description: "An more evil insult generator",
  async execute(message) {
    let getInsult = async () => {
      let response = await axios.get(
        "https://evilinsult.com/generate_insult.php?lang=en&type=json"
      );
      let insult = response.data.insult;
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
