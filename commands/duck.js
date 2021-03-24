const axios = require("axios");

module.exports = {
  name: "duck",
  description: "Fetches duck image",
  async execute(message) {
    message.channel.send("https://source.unsplash.com/1600x900/?duck");
  },
};
