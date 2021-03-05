const axios = require("axios");

module.exports = {
  name: "dog",
  description: "Fetches dog image",
  async execute(message) {
    let getDog = async () => {
      let response = await axios.get("https://dog.ceo/api/breeds/image/random");
      let dog = response.data.message;
      return dog;
    };

    let dogValue = await getDog();
    message.channel.send({ files: [dogValue] });
  },
};
