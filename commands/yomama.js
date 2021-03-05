const axios = require("axios");

module.exports = {
  name: "yomama",
  description: "Fetches yo mama joke",
  async execute(message) {
    let getYomama = async () => {
      let response = await axios.get("https://api.yomomma.info/");
      let yoMama = response.data.joke;
      return yoMama;
    };
    if (message.mentions.users.first() === undefined) {
      taggedUser = "";
    } else {
      taggedUser = message.mentions.users.first();
    }

    let yoMamaValue = await getYomama();
    let reply = yoMamaValue + ` ${taggedUser}`;
    message.channel.send(reply);
  },
};
