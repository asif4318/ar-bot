const {
    arOffset,
    startOfSemester,
    endOfSemester,
    semesterHolidays,
    rotationDayOffset,
} = require('./config.json');

generateSemesterSchoolDays = {
    arRotation: [
        'A 1/2',
        'B 1/2',
        'C 1/2',
        'A 4/5',
        'B 4/5',
        'C 4/5',
        'A 6/7',
        'B 6/7',
        'C 6/7',
    ],
    rotationDays: ['A', 'B', 'C'],
    allSchoolDays: function (start, end, blockOutDates) {
        startDate = new Date(start);
        endDate = new Date(end);

        let arr = [];
        for (
            dt = new Date(startDate);
            dt <= endDate;
            dt.setDate(dt.getDate() + 1)
        ) {
            if (
                dt.getDay() !== 0 &&
                dt.getDay() !== 6 &&
                !blockOutDates.includes(dt.toLocaleDateString())
            ) {
                arr.push(new Date(dt).toLocaleDateString());
            }
        }
        return arr;
    },
    appendSessionAR: function (start, end, blockOutDates) {
        let values = [];
        totalDays = this.allSchoolDays(start, end, blockOutDates);
        for (let i = 0; i < totalDays.length; i++) {
            values[i] = {
                date: totalDays[i],
                ar: this.arRotation[(i + arOffset) % this.arRotation.length],
                session: (Math.floor(i / 3) + 1),
                rotationDay: this.rotationDays[(i + rotationDayOffset) % 3],
            };
        }
        return values;
    },
    arDateReply: function (checkTomorrow) {
        let semesterSchoolDays = generateSemesterSchoolDays.appendSessionAR(
            startOfSemester,
            endOfSemester,
            semesterHolidays
        );
        let timeNow = new Date();
        if (checkTomorrow === true) {
            timeNow.setDate(timeNow.getDate() + 1);
        }

        infoNow = semesterSchoolDays.find(
            (day) => day.date === timeNow.toLocaleDateString()
        );
        replyContent = `The rotation day is: ${infoNow.rotationDay}. The session is ${infoNow.session}. The AR period is ${infoNow.ar}.`;
        return replyContent;
    },
    monthDateReply: function (checkTomorrow) {
        const timeNow = new Date();
        replyContent = `I am AR Bot and the date is: ${timeNow.toLocaleDateString()}. The time is: ${timeNow.toLocaleTimeString()}`;
        if (checkTomorrow === true) {
            timeNow.setDate(timeNow.getDate() + 1);
            replyContent = `I am AR Bot and tomorrow's date is: ${timeNow.toLocaleDateString()}. The time is: ${timeNow.toLocaleTimeString()}`;
        }
        return replyContent;
    },
};

module.exports = {
    arFunction: function (isTomorrow) {
        let timeNow = new Date();
        if (isTomorrow === true) {
            timeNow.setDate(timeNow.getDate() + 1);
        }
        if ([0, 6].includes(timeNow.getDay())) {
            return 'There is no school today, please enjoy your weekend!';
        }
        return [
            generateSemesterSchoolDays.arDateReply(isTomorrow),
            generateSemesterSchoolDays.monthDateReply(isTomorrow),
        ];
    },
};
