const Discord = require("discord.js");
const bot = new Discord.Client();
require("dotenv").config();
const token = process.env.TOKEN;
const http = require("http");
const fs = require("fs");
const axios = require("axios");
const prefix = "$";
const autoGenDates = require('./dates');
console.log(autoGenDates)

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  fs.createReadStream("public/index.html").pipe(res);
});

server.listen(process.env.PORT || 3000);

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let arDates = new Map();
arDates = [
  { date: "1_12", arPeriod: "B 6/7", rotationDay: "C" },
  { date: "1_16", arPeriod: "C 6/7", rotationDay: "A" },
  { date: "1_17", arPeriod: "A 1/2", rotationDay: "B" },
  { date: "1_18", arPeriod: "B 1/2", rotationDay: "C" },
  { date: "1_19", arPeriod: "C 1/2", rotationDay: "A" },
  { date: "1_22", arPeriod: "A 4/5", rotationDay: "B" },
  { date: "1_23", arPeriod: "B 4/5", rotationDay: "C" },
  { date: "1_24", arPeriod: "C 4/5", rotationDay: "A" },
  { date: "1_25", arPeriod: "A 6/7", rotationDay: "B" },
  { date: "1_26", arPeriod: "B 6/7", rotationDay: "C" },
  { date: "2_1", arPeriod: "C 6/7", rotationDay: "A" },
  { date: "2_2", arPeriod: "A 1/2", rotationDay: "B" },
  { date: "2_3", arPeriod: "B 1/2", rotationDay: "C" },
  { date: "2_4", arPeriod: "C 1/2", rotationDay: "A", session: "11" },
  { date: "2_5", arPeriod: "A 4/5", rotationDay: "B", session: "11" },
  { date: "2_8", arPeriod: "B 4/5", rotationDay: "C", session: "11" },
  { date: "2_9", arPeriod: "C 4/5", rotationDay: "A", session: "12" },
  { date: "2_10", arPeriod: "A 6/7", rotationDay: "B", session: "12" },
  { date: "2_11", arPeriod: "B 6/7", rotationDay: "C", session: "12" },
  { date: "2_12", arPeriod: "C 6/7", rotationDay: "A", session: "13" },
];

function arDateReply() {
  const timeNow = new Date();
  timeNowDayDate = timeNow.getMonth() + "_" + timeNow.getDate();
  infoNow = arDates.find((arDates) => arDates.date === timeNowDayDate);

  replyContent = `The rotation day is: ${infoNow.rotationDay}. The AR period is ${infoNow.arPeriod}. The session is ${infoNow.session}.`;
  return replyContent;
}

function monthDateReply() {
  const timeNow = new Date();
  replyContent = `I am AR Bot and the date is:  ${timeNow.toLocaleDateString()}. The time is: ${timeNow.toLocaleTimeString()}`;
  return replyContent;
}

function getCurrentDayDate() {
  currentTime = new Date();
  x = currentTime.getMonth();
  y = currentTime.getDate();
  let dayDate = `${x}_${y}`;
  return dayDate;
}

bot.login(token);

bot.on("ready", () => {
  console.log(`The Bot is logged in as ${bot.user.tag}.`);
  bot.user.setActivity("to $help", { type: "LISTENING" });
}); // You don't need to add anything to the message event listener

bot.on("message", async (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();

  if (command === "ar") {
    const timeNow = new Date();
    if (timeNow.getDay() === 6 || timeNow.getDay() === 0) {
      msg.reply("There is no school today, please enjoy your weekend!");
    } else if (getCurrentDayDate() !== undefined) {
      msg.reply(arDateReply());
      msg.reply(monthDateReply());
    }
  }

  if (command === "compliment") {
    let getCompliment = async () => {
      let response = await axios.get("https://complimentr.com/api");
      let compliment = response.data.compliment;
      return compliment;
    };

    if (msg.mentions.users.first() === undefined) {
      taggedUser = "";
    } else {
      taggedUser = msg.mentions.users.first();
    }

    let complimentValue = await getCompliment();
    let reply = complimentValue + ` ${taggedUser}`;
    msg.channel.send(reply);
  }

  if (command === "insult") {
    let getInsult = async () => {
      let response = await axios.get("https://insult.mattbas.org/api/insult");
      let insult = response.data;
      return insult;
    };
    if (msg.mentions.users.first() === undefined) {
      taggedUser = "";
    } else {
      taggedUser = msg.mentions.users.first();
    }

    let insultValue = await getInsult();
    let reply = insultValue + ` ${taggedUser}`;
    msg.channel.send(reply);
  }

  if (command === "dadjoke") {
    let getDadJoke = async () => {
      let response = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      let dadJoke = response.data.joke;
      return dadJoke;
    };
    if (msg.mentions.users.first() === undefined) {
      taggedUser = "";
    } else {
      taggedUser = msg.mentions.users.first();
    }

    let dadJokeValue = await getDadJoke();
    let reply = dadJokeValue + ` ${taggedUser}`;
    msg.channel.send(reply);
  }
  if (command === "yomama") {
    let getYomama = async () => {
      let response = await axios.get("https://api.yomomma.info/");
      let yoMama = response.data.joke;
      return yoMama;
    };
    if (msg.mentions.users.first() === undefined) {
      taggedUser = "";
    } else {
      taggedUser = msg.mentions.users.first();
    }

    let yoMamaValue = await getYomama();
    let reply = yoMamaValue + ` ${taggedUser}`;
    msg.channel.send(reply);
  }

  if (command === "insult2") {
    let getInsult = async () => {
      let response = await axios.get(
        "https://evilinsult.com/generate_insult.php?lang=en&type=json"
      );
      let insult = response.data.insult;
      return insult;
    };
    if (msg.mentions.users.first() === undefined) {
      taggedUser = "";
    } else {
      taggedUser = msg.mentions.users.first();
    }

    let insultValue = await getInsult();
    let reply = insultValue + ` ${taggedUser}`;
    msg.channel.send(reply);
  }
  if (command === "inspire") {
    function randomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let getQuote = async () => {
      let response = await axios.get("https://type.fit/api/quotes");
      let quote = response.data[randomInteger(0, 1542)];
      return quote;
    };

    if (msg.mentions.users.first() === undefined) {
      taggedUser = "";
    } else {
      taggedUser = msg.mentions.users.first();
    }

    let quoteValue = await getQuote();
    let quoteReply = `"${quoteValue.text}" - ${quoteValue.author} ${taggedUser}`;
    console.log(quoteReply);
    msg.channel.send(quoteReply);
  }

  if (command === "help") {
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("**Help**")
      .setAuthor(
        "IB Bot"
      )
      .setDescription("A bot originally designed for IB students.")
      .addFields(
        {
          name: "$ar",
          value: "Generates the current day's AR period",
        },
        {
          name: "$graduation",
          value:
            "Generates time until PHU's senior graduation (On Jun 1st, 2021)",
        },
        {
          name: "$insult {@user}",
          value:
            "Generates insult with the ability to be directed at a specified user",
        },
        {
          name: "$insult2 {@user}",
          value:
            "Generates more extreme insult with the ability to be directed at a specified user",
        },
        {
          name: "$yomama {@user}",
          value: "Generates yo mama joke",
        },
        {
          name: "$dadjoke",
          value: "Generates a dad joke",
        },
        {
          name: "$meme",
          value: "Fetches a meme",
        },
        {
          name: "$cat",
          value: "Fetches a cat image",
        },
        {
          name: "$dog",
          value: "Fetches a dog image",
        },
        {
          name: "$nasa",
          value: "Fetches a NASA's astronomy picture of the day",
        },
        {
          name: "$pokemon {name of pokemon}",
          value:
            "Fetches the pokemon's sprite from given name {example: `$pokemon ditto`}",
        },
      )
      .setTimestamp()
      .setFooter("Bot Made by Asif");

    msg.channel.send(embed);
  }

  if (command === "cat") {
    let getCat = async () => {
      let response = await axios.get(
        "https://api.thecatapi.com/v1/images/search"
      );
      let catArray = response.data[0];
      let cat = catArray.url;
      return cat;
    };

    let catValue = await getCat();
    msg.channel.send({ files: [catValue] });
  }
  if (command === "dog") {
    let getDog = async () => {
      let response = await axios.get("https://dog.ceo/api/breeds/image/random");
      let dog = response.data.message;
      return dog;
    };

    let dogValue = await getDog();
    msg.channel.send({ files: [dogValue] });
  }

  if (command === "graduation") {
    let graduationCountdown = () => {
      const gradDate = new Date("06/01/2021");
      const now = new Date();

      let distance = gradDate.getTime() - now.getTime();

      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      let reply = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      return reply;
    };

    msg.channel.send(
      "Time left until senior graduation: " + graduationCountdown()
    );
  }
  if (command === "8ball" && args.length >= 1) {
    let get8ball = async () => {
      let response = await axios.get(
        "https://customapi.aidenwallis.co.uk/api/v1/misc/8ball"
      );
      let eightBall = response.data;
      return eightBall;
    };
    let eightBallValue = await get8ball();
    msg.channel.send(eightBallValue);
  }
  if (command === "pokemon" && args.length >= 0 && args[0].length >= 1) {
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
      reply = msg.channel.send(
        "Sorry that pokemon does not exist. Please check your spelling and try again."
      );
    } else {
      let sprite = fetchedPokemonInfo.sprites.front_default;
      let name = fetchedPokemonInfo.name;
      doubleReply = () => {
        msg.channel.send(`Here is: ${name}`);
        msg.channel.send(sprite);
      };
      reply = doubleReply();
    }
    reply;
  }
  if (command === "nasa") {
    let getNasa = async () => {
      let response = await axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA}`
      );
      let nasa = response.data.hdurl;
      return nasa;
    };

    let nasaValue = await getNasa();
    msg.channel.send({ files: [nasaValue] });
  }
  if (command === "meme") {
    let getMeme = async () => {
      let response = await axios.get("https://meme-api.herokuapp.com/gimme");
      let meme = response.data.url;
      return meme;
    };
    let memeValue = await getMeme();
    msg.channel.send(memeValue);
  }
});
