const axios = require("axios");

module.exports = {
  name: "pokemon",
  description: "Uses PokeAPI to get pokemon info",
  async execute(message, args) {
    apiLink = "https://pokeapi.co/api/v2/pokemon/";

    switch (args[0]) {
      case "search":
        try {
          let response = await axios.get(apiLink + args[1]);
          let pokemonInfo = response.data;
          let pokemonName = pokemonInfo.name;
          sprite = pokemonInfo.sprites.front_default;
          message.channel.send(
            `Here is ${pokemonName}: ` + sprite
          );
        } catch (err) {
          console.log(err);
          return (error = "Pokemon name entered incorrectly");
        }
        break;
      case "2":
        message.channel.send("2nd case");
    }
  },
};
