const Discord = require("discord.js");
const bot = new Discord.Client();
const token = "ODA5NzkxMzU1MzcwNDcxNDg2.YCaO-A.NnJEz6kR0-FEw3BYHRela1RX4bs";
const cron = require("cron");
const app = require("express");
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
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let arDates = new Map();
arDates = [
  { date: "1_12", arPeriod: "B 6/7", rotationDay: "C" },
  { date: "1_16", arPeriod: "C 6/7", rotationDay: "A" },
  { date: "1_17", arPeriod: "A 1/2", rotationDay: "B" },
  { date: "1_18", arPeriod: "B 1/2", rotationDay: "C" },
  { date: "1_19", arPeriod: "C 1/2", rotationDay: "A" },
  { date: "1_20", arPeriod: "A 4/5", rotationDay: "B" },
];

let currentInfo = arDates.find(
  (arDates) => arDates.date === `${now.getMonth()}_${now.getDate()}`
);

bot.login(token);

bot.on("ready", () => {
  console.log(`The Bot is logged in as ${bot.user.tag}.`);
  console.log(`${now.getMonth()}_${now.getDate()}`);
  console.log(currentInfo);
  console.log(now.getDay());
}); // You don't need to add anything to the message event listener

bot.on("message", (msg) => {
  if (msg.content === "!ar") {
    if (now.getDay() === 6 || now.getDay() === 0) {
      msg.reply("There is no school today, please enjoy your weekend!");
    }
    if (currentInfo !== undefined) {
      msg.reply(
        `I am AR Bot and the day is ${
          months[now.getMonth()]
        } ${now.getDate()}th.`
      );
      msg.reply(
        `The rotation day is : ${currentInfo.rotationDay}. The AR period is: ${currentInfo.arPeriod}.`
      );
    }
  }
});
