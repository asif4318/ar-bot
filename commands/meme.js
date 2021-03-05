const axios = require("axios");

module.exports = {
  name: "meme",
  description: "Fetches meme",
  async execute(message) {
    let getMeme = async () => {
        let response = await axios.get("https://meme-api.herokuapp.com/gimme");
        let meme = response.data.url;
        return meme;
      };
      let memeValue = await getMeme();
      message.channel.send(memeValue);
  },
};
