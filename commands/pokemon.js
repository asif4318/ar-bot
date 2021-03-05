const axios = require("axios");

module.exports = {
  name: "pokemon",
  description: "Fetches a pokemon sprite",
  async execute(message, args) {
    let getPokemon = async () => {
      let requestedPokemon = args[0];
      try {
        let response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${requestedPokemon}`
        );
        let pokemonInfo = response.data;
        return pokemonInfo;
      } catch (err) {
        return (error = "Sorry the Pokemon was entered incorrectly");
      }
    };
    let fetchedPokemonInfo = await getPokemon();
    let errMessage = "Sorry the Pokemon was entered incorrectly";
    if (fetchedPokemonInfo === errMessage) {
      reply = message.channel.send(
        "Sorry that pokemon does not exist. Please check your spelling and try again."
      );
    } else {
      let sprite = fetchedPokemonInfo.sprites.front_default;
      let name = fetchedPokemonInfo.name;
      doubleReply = () => {
        message.channel.send(`Here is: ${name}`);
        message.channel.send(sprite);
      };
      reply = doubleReply();
    }
    reply;
  },
};
