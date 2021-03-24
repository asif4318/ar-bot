const axios = require("axios");

module.exports = {
  name: "duck",
  description: "Fetches duck image",
  async execute(message) {
    const url = "https://api.unsplash.com/photos/random/?";

    let getDuck = async () => {
      let response = await axios.get("https://api.unsplash.com/photos/random/?client_id=OhXv9AYT50C1KNemBgQj-bifOWG6-y0w-OQ5HLSvje4&query=duck");
      let duck = response.data.urls.regular;
      return duck;
    };

    let duckValue = await getDuck();
    message.channel.send(duckValue);
  },
};
