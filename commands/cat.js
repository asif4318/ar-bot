const axios = require("axios");

module.exports = {
  name: "cat",
  description: "Fetches cat image",
  async execute(message) {
    let getCat = async () => {
      let response = await axios.get(
        "https://api.thecatapi.com/v1/images/search"
      );
      let catArray = response.data[0];
      let cat = catArray.url;
      return cat;
    };

    let catValue = await getCat();
    message.channel.send({ files: [catValue] });
  },
};
