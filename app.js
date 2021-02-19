const Discord = require("discord.js");
const bot = new Discord.Client();
require('dotenv').config()
const token = process.env.TOKEN;
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  fs.createReadStream("public/index.html").pipe(res);
});

server.listen(process.env.PORT || 3000);

const now = new Date();
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
];

function getCurrentDayDate() {
  currentTime = new Date();
  x = currentTime.getMonth();
  y = currentTime.getDate();
  let dayDate = `${x}_${y}`
  return dayDate; 
};


function arDateReply() {
  infoNow = arDates.find((arDates) => arDates.date === getCurrentDayDate());
  replyContent = `The rotation day is: ${infoNow.rotationDay}. The AR period is ${infoNow.arPeriod}`
  return replyContent;
}


bot.login(token);

bot.on("ready", () => {
  console.log(`The Bot is logged in as ${bot.user.tag}.`);
  console.log(getCurrentDayDate());
  console.log(arDateReply());
}); // You don't need to add anything to the message event listener

bot.on("message", (msg) => {
  if (msg.content === "!ar") {
    if (now.getDay() === 6 || now.getDay() === 0) {
      msg.reply("There is no school today, please enjoy your weekend!");
    }
    if (getCurrentDayDate() !== undefined) {
      msg.reply(
        `I am AR Bot and the day is ${
          months[now.getMonth()]
        } ${now.getDate()}th.`
      );
      msg.reply(arDateReply());
    }
  }
});
