const axios = require("axios");

module.exports = {
  name: "nasa",
  description: "Fetches NASA's Astronomy Image of the Day",
  async execute(message) {
    let getNasa = async () => {
      let response = await axios.get(
        "https://api.nasa.gov/planetary/apod?api_key=0MASGs4gcTRGjh3nEcBQ22qq3pNlGvQQHXH4Mzy8"
      );
      let nasa = response.data.hdurl;
      return nasa;
    };

    let nasaValue = await getNasa();
    message.channel.send({ files: [nasaValue] });
  },
};
