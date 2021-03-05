const axios = require("axios");

module.exports = {
  name: "dadjoke",
  description: "Fetches a dad joke",
  async execute(message) {
    let getDadJoke = async () => {
        let response = await axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" },
        });
        let dadJoke = response.data.joke;
        return dadJoke;
      };
      if (message.mentions.users.first() === undefined) {
        taggedUser = "";
      } else {
        taggedUser = message.mentions.users.first();
      }
  
      let dadJokeValue = await getDadJoke();
      let reply = dadJokeValue + ` ${taggedUser}`;
      message.channel.send(reply);
    },
}
