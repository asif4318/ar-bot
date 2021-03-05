const axios = require("axios");

module.exports = {
  name: "8ball",
  description: "Returns a magic 8ball response",
  async execute(message) {
    let get8ball = async () => {
      let response = await axios.get(
        "https://customapi.aidenwallis.co.uk/api/v1/misc/8ball"
      );
      let eightBall = response.data;
      return eightBall;
    };
    let eightBallValue = await get8ball();
    message.channel.send(eightBallValue);
  },
};
