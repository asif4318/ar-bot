const axios = require("axios");

module.exports = {
  name: "nasa",
  description: "Fetches NASA's Astronomy Image of the Day",
  async execute(message) {
    let getNasa = async () => {
      let response = await axios.get(
        "https://api.nasa.gov/planetary/apod?api_key=0MASGs4gcTRGjh3nEcBQ22qq3pNlGvQQHXH4Mzy8"
      );
      let nasa = response.data.url;
      return nasa;
    };

    let nasaValue = await getNasa();
    try {
    message.channel.send(nasaValue);
    let now = new Date()
    console.log(`$nasa: ${nasaValue} | ${now.toLocaleDateString() + " " + now.toLocaleTimeString()}`)
    } catch (error) {
      console.error(error);
      message.reply('There was an error trying to execute that command!');
    }
  },
};
