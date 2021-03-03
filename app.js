const Discord = require("discord.js");
const bot = new Discord.Client();
require("dotenv").config();
const token = process.env.TOKEN;
const http = require("http");
const fs = require("fs");
const fetch = require("node-fetch");

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
  { date: "2_1", arPeriod: "C 6/7", rotationDay: "A" },
  { date: "2_2", arPeriod: "A 1/2", rotationDay: "B" },
  { date: "2_3", arPeriod: "B 1/2", rotationDay: "C" },
  { date: "2_4", arPeriod: "C 1/2", rotationDay: "A" },
  { date: "2_5", arPeriod: "A 4/5", rotationDay: "B" },
  { date: "2_8", arPeriod: "B 4/5", rotationDay: "C" },
  { date: "2_9", arPeriod: "C 4/5", rotationDay: "A" },
  { date: "2_10", arPeriod: "A 6/7", rotationDay: "B" },
  { date: "2_11", arPeriod: "B 6/7", rotationDay: "C" },
  { date: "2_12", arPeriod: "C 6/7", rotationDay: "A" },
  { date: "2_15", arPeriod: "A 1/2", rotationDay: "B" },
  { date: "2_16", arPeriod: "B 1/2", rotationDay: "C" },
  { date: "2_17", arPeriod: "C 1/2", rotationDay: "A" },
  { date: "2_18", arPeriod: "A 4/5", rotationDay: "B" },
  { date: "2_19", arPeriod: "B 4/5", rotationDay: "C" },
  { date: "2_22", arPeriod: "C 4/5", rotationDay: "A" },
  { date: "2_23", arPeriod: "A 6/7", rotationDay: "B" },
  { date: "2_24", arPeriod: "B 6/7", rotationDay: "C" },
  { date: "2_25", arPeriod: "C 6/7", rotationDay: "A" },
];


function arDateReply() {
  const timeNow = new Date();
  timeNowDayDate = timeNow.getMonth() + "_" + timeNow.getDate();
  infoNow = arDates.find((arDates) => arDates.date === timeNowDayDate);

  replyContent = `The rotation day is: ${infoNow.rotationDay}. The AR period is ${infoNow.arPeriod}`;
  return replyContent;
}

function monthDateReply() {
  const timeNow = new Date();
  replyContent = `I am AR Bot and the date is:  ${timeNow.toLocaleDateString()}. The time is: ${timeNow.toLocaleTimeString()}`;
  return replyContent;
}

timeTest1 = currentTime();

async function currentTime() {
  let datetime;
  try {
    var response = await fetch(
      "http://worldtimeapi.org/api/timezone/America/New_York"
    );
    datetime = await response.json();
    timeSplit = datetime.datetime;
    console.log(timeSplit);
    return timeSplit;
  } catch (e) {
    console.error(e);
  }
}

async function getInternetDayDate() {
  let datetime;
  try {
    var response = await fetch(
      "http://worldtimeapi.org/api/timezone/America/New_York"
    );
    datetime = await response.json();
    timeSplit = datetime.datetime.split(/[-,T]/);
    month = timeSplit[1];
    dayOfMonth = timeSplit[2];
    dayDate = month + "_" + dayOfMonth;
    console.log(dayDate);
    return dayDate;
  } catch (e) {
    console.error(e);
  }
}

async function getInternetMonth() {
  let datetime;
  try {
    var response = await fetch(
      "http://worldtimeapi.org/api/timezone/America/New_York"
    );
    datetime = await response.json();
    timeSplit = datetime.datetime.split(/[-,T]/);
    month = timeSplit[1];
    console.log(month);
    return month;
  } catch (e) {
    console.error(e);
  }
}

async function getInternetDate() {
  let datetime;
  try {
    var response = await fetch(
      "http://worldtimeapi.org/api/timezone/America/New_York"
    );
    datetime = await response.json();
    timeSplit = datetime.datetime.split(/[-,T]/);
    dayOfMonth = timeSplit[2];
    console.log(dayOfMonth);
    return dayOfMonth;
  } catch (e) {
    console.error(e);
  }
}

async function getInternetDayofWeek() {
  let internetDate;
  try {
    var response = await fetch(
      "http://worldtimeapi.org/api/timezone/America/New_York"
    );
    internetDate = await response.json();
    dayOfWeek = internetDate.day_of_week;
    console.log("The day of week is " + dayOfWeek);
    return dayOfWeek;
  } catch (e) {
    console.error(e);
  }
}

function getCurrentDayDate() {
  currentTime = new Date();
  x = currentTime.getMonth();
  y = currentTime.getDate();
  let dayDate = `${x}_${y}`;
  return dayDate;
}

function timetest() {
  const serverTime = new Date();
  test = serverTime.getDate();
  return test;
}

bot.login(token);

bot.on("ready", () => {
  console.log(`The Bot is logged in as ${bot.user.tag}.`);
  console.log(now.getDate() + " " + now.getDay());
}); // You don't need to add anything to the message event listener

bot.on("message", (msg) => {
  if (msg.content === "!ar") {
    const timeNow = new Date();
    if (timeNow.getDay() === 6 || timeNow.getDay() === 0) {
      msg.reply("There is no school today, please enjoy your weekend!");
    } else if (getCurrentDayDate() !== undefined) {
      msg.reply(arDateReply());
      msg.reply(monthDateReply());
    }
  }
  if (msg.content === "!time") {
    msg.reply(now.getDate());
    msg.reply(`Test: ${timetest()}`);
  }
});
