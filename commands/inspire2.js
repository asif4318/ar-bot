const axios = require("axios");

module.exports = {
  name: "inspire2",
  description: "Fetches inspirational quote",
  async execute(message) {
    
      let getQuote = async () => {
        let response = await axios.get("https://inspirobot.me//api?generate=true");
        return response.data; 
      };
    
      if (message.mentions.users.first() === undefined) {
        taggedUser = "";
      } else {
        taggedUser = message.mentions.users.first();
      }
    
      let quoteValue = await getQuote();
      console.log(quoteValue);
      message.channel.send(quoteValue);
  },
};
