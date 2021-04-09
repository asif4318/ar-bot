const { semesterHolidays } = require("../config.json");

module.exports = {
  name: "ibexams",
  description: "Fetches time til IB Exams begin",
  execute(message) {
    function schoolDays(start, end, blockOutDates) {
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
    }
    var date1 = new Date();
    var date2 = new Date("05/03/2021");
    let z = schoolDays(date1, date2, semesterHolidays);
    console.log(z);
    message.channel.send("School Days left until IB exams begin on May (excluding holidays and weekends): " + z.length);
  },
};
