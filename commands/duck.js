const axios = require("axios");

module.exports = {
	name: "duck",
	description: "Advanced duck search using Google",
	async execute(message, args) {
		apiLink =
			"https://www.googleapis.com/customsearch/v1?key=AIzaSyDxRGE_aokhglI6ayaYw4hIk6x_ebkHROY&cx=ca71548ca44eba24f&q=ducks&searchType=image";

		random = Math.floor(Math.random() * 30);
		random2 = Math.floor(Math.random() * 10);
		if (random > 10) {
			apiLink += `&start=${random}`;
		}
		response = await axios.get(apiLink);
		let items = response.data.items;
		message.channel.send(items[random2].link);
	}
};
