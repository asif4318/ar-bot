const MarchHolidays = [15, 16, 17, 18, 19];
const AprilHolidays = [1, 2];
const MayHolidays = [31];
const JuneHolidays = [
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
];

const arRotation = [
  "A 1/2",
  "B 1/2",
  "C 1/2",
  "A 4/5",
  "B 4/5",
  "C 4/5",
  "A 6/7",
  "B 6/7",
  "C 6/7",
];

const holidays = [MarchHolidays, AprilHolidays, MayHolidays, JuneHolidays];

getSchoolDaysInMonth = (year, month, blockOutDates) =>  {
  const days = [];
  let date = new Date(year, month);
  while (date.getMonth() === month) {
    if (
      ![0, 6].includes(date.getDay()) &&
      !blockOutDates.includes(date.getDate())
    )
      days.push(month + "_" + date.getDate());
    date.setDate(date.getDate() + 1);
  }
  return days;
}

let monthArray = ["January", "February", "March", "April", "May", "June"];

getSchoolDaysInSemester = () => {
  let array = [];
  for (let i = 2; i < monthArray.length; i++) {
    array = array.concat(getSchoolDaysInMonth(2021, i, holidays[i - 2]));
  }
  return array;
}

function appendAR() {
  let appendedDays = [];
  let semesterDays = getSchoolDaysInSemester(); 
  for (let i = 0; i < semesterDays.length; i++) {
    appendedDays.push(semesterDays[i] + "*" + arRotation[((i + 8) % arRotation.length)])
  }
  return appendedDays; 
}

console.log(appendAR())

function changeDemo() {
    document.getElementById("demo").innerHTML = appendAR();
}
