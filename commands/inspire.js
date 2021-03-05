const axios = require("axios");

module.exports = {
  name: "inspire",
  description: "Fetches inspirational quote",
  async execute(message) {
    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    
      let getQuote = async () => {
        let response = await axios.get("https://type.fit/api/quotes");
        let quote = response.data[randomInteger(0, 1542)];
        return quote;
      };
    
      if (message.mentions.users.first() === undefined) {
        taggedUser = "";
      } else {
        taggedUser = message.mentions.users.first();
      }
    
      let quoteValue = await getQuote();
      let quoteReply = `"${quoteValue.text}" - ${quoteValue.author} ${taggedUser}`;
      console.log(quoteReply);
      message.channel.send(quoteReply);
  },
};





