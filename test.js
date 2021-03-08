const { arOffset, startOfSemester, endOfSemester, semesterHolidays} = require("./config.json");

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

