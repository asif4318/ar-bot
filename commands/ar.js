const { arOffset, startOfSemester, endOfSemester, semesterHolidays} = require("../config.json");

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
  allSchoolDays: function (start, end, blockOutDates) {
    for (
      var arr = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
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
  appendSessionAR: function (start, end, blockOutDates) {
    var values = [];
    z = this.allSchoolDays(start, end, blockOutDates);
    for (var i = 0; i < z.length; i++) {
      values[i] = {
        date: z[i],
        ar: this.arRotation[(i + arOffset) % this.arRotation.length],
        session: 1 + Math.floor(i / 3),
      };
    }
    return values;
  },

};

function arDateReply() {
  let z = generateSchoolDaysForSemester.appendSessionAR(
    new Date(startOfSemester),
    new Date(endOfSemester),
    semesterHolidays,
  );
  const timeNow = new Date();
  timeNowDayDate =
    timeNow.getMonth() + "_" + timeNow.getDate() + "_" + timeNow.getFullYear();
  infoNow = z.find((z) => z.date === timeNowDayDate);
  
  split = infoNow.ar.split(" ");
  rotationDay = split[0];
  replyContent = `The rotation day is: ${rotationDay}. The session is ${infoNow.session}. The AR period is ${infoNow.ar}.`;
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

module.exports = {
  name: "ar",
  description: "Gives AR, Date, and Session",
  execute(message) {
    const timeNow = new Date();
    timeNowDayDate =
      timeNow.getMonth() +
      "_" +
      timeNow.getDate() +
      "_" +
      timeNow.getFullYear();
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
      message.reply(arDateReply());
      console.log(arDateReply());
      console.log(getDayInfo);
      message.reply(monthDateReply());
      console.log(monthDateReply());
    }
  },
};
