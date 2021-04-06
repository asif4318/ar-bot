const {
  arOffset,
  startOfSemester,
  endOfSemester,
  semesterHolidays
} = require("../config.json");

generateSchoolDaysForSemester = {
  arRotation: [
    "A 1/2",
    "B 1/2",
    "C 1/2",
    "A 4/5",
    "B 4/5",
    "C 4/5",
    "A 6/7",
    "B 6/7",
    "C 6/7",
  ],
  rotationDays: ["A", "B", "C"],
  allSchoolDays: function(start, end, blockOutDates) {
    for (
      var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)
    ) {
      if (
        ![0, 6].includes(dt.getDay()) &&
        !blockOutDates.includes(
          dt.getMonth() + "_" + dt.getDate() + "_" + dt.getFullYear()
        )
      ) {
        arr.push(
          new Date(dt).getMonth() +
          "_" +
          new Date(dt).getDate() +
          "_" +
          new Date(dt).getFullYear()
        );
      }
    }
    return arr;
  },
  appendSessionAR: function(start, end, blockOutDates) {
    var values = [];
    z = this.allSchoolDays(start, end, blockOutDates);
    for (var i = 0; i < z.length; i++) {
      values[i] = {
        date: z[i],
        ar: this.arRotation[(i + arOffset) % this.arRotation.length],
        session: Math.floor((i / 3)),
        rotationDay: this.rotationDays[(i + 1) % 3],
      };
    }
    return values;
  },

};

function arDateReply(checkTomorrow) {
  let z = generateSchoolDaysForSemester.appendSessionAR(
    new Date(startOfSemester),
    new Date(endOfSemester),
    semesterHolidays,
  );
  const timeNow = new Date();
  if (checkTomorrow === true) {
    timeNow.setDate(timeNow.getDate() + 1);
    console.log("arDate reply tomorrow " + timeNow.getDate())
  }
  timeNowDayDate =
    timeNow.getMonth() + "_" + timeNow.getDate() + "_" + timeNow.getFullYear();
  infoNow = z.find((z) => z.date === timeNowDayDate);


  replyContent = `The rotation day is: ${infoNow.rotationDay}. The session is ${infoNow.session}. The AR period is ${infoNow.ar}.`;
  return replyContent;
}

function monthDateReply(checkTomorrow) {
  const timeNow = new Date();
  replyContent = `I am AR Bot and the date is:  ${timeNow.toLocaleDateString()}. The time is: ${timeNow.toLocaleTimeString()}`;
  if (checkTomorrow === true) {
    timeNow.setDate(timeNow.getDate() + 1);
    replyContent = `I am AR Bot and tomorrow's date is:  ${timeNow.toLocaleDateString()}. The time is: ${timeNow.toLocaleTimeString()}`;
  }
  return replyContent;
}

function getCurrentDayDate(checkTomorrow) {
  currentTime = new Date();
  x = currentTime.getMonth();
  y = currentTime.getDate();
  let dayDate = `${x}_${y}`;
  return dayDate;
}

module.exports = {
  name: "ar",
  description: "Gives AR, Date, and Session",
  execute(message, args) {
    const timeNow = new Date();
    let isTomorrow = false;
    if (args[0] === "tomorrow") {
      timeNow.setDate(timeNow.getDate() + 1);
      console.log("tomorrow");
      isTomorrow = true;
    }
    timeNowDayDate =
      timeNow.getMonth() +
      "_" +
      timeNow.getDate() +
      "_" +
      timeNow.getFullYear();
    console.log(timeNowDayDate + "test");
    let z = generateSchoolDaysForSemester.appendSessionAR(
      new Date(startOfSemester),
      new Date(endOfSemester),
      []
    );
    getDayInfo = z.find((z) => z.date === timeNowDayDate);
    if (
      timeNow.getDay() === 6 ||
      timeNow.getDay() === 0 ||
      getDayInfo == undefined
    ) {
      message.reply("There is no school today, please enjoy your weekend!");
    } else if (getCurrentDayDate() !== undefined) {
      message.reply(arDateReply(isTomorrow));
      console.log(arDateReply(isTomorrow));
      console.log(getDayInfo);
      message.reply(monthDateReply(isTomorrow));
      console.log(monthDateReply(isTomorrow));
    }
  },
};
