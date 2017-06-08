import moment from 'moment';
var format = require('format-number');

//get month as an array index, i.e. jan is 0, feb is 1
export var getMonth = (month) => {
    var mom = moment(month, 'MM/DD/YYYY');
    return mom.month();
}

export var formatDate = (unixDate) => {
    return moment.unix(unixDate).format('MM/DD/YYYY');
}

export var getSpread = (spread) => {
    var spreadByDate = [];
    var weeklySpread = 0;
    var sprd = 0;
    var sundays = [];
    //push 26 Sundays into array, starting with the first Sunday of January, 2017;
    var startDateVar = moment().set({ 'year': 2017, 'month': 0, 'day': 7 });
    for (var i = 0; i < 26; i++) {
        sundays.push(startDateVar.format("MM/DD/YYYY"));
        startDateVar = startDateVar.add(7, 'days')
    }
    sundays.forEach((date) => {
        spread.forEach((contractor) => {
            if (contractor.completedDate === '') {
                var completedDate = moment().set({ 'year': 2100, 'month': 0, 'day': 1 });;
            } else {
                completedDate = formatDate(contractor.completedDate);
            }
            var startDate = formatDate(contractor.startDate);
            if (moment(date).isBefore(moment(completedDate)) && moment(date).isAfter(moment(startDate))) {
                weeklySpread += contractor.spread;
            };
        });
        spreadByDate.push({
            date: date,
            spread: weeklySpread
        });
        weeklySpread = 0;
    });
    return spreadByDate;
};

export var ytdSpread = (spread) => {
    var total = 0;
    var now = moment();
    var spreadArr = getSpread(spread);
    spreadArr.forEach((contractor) => {
        if (moment(contractor.date).isBefore(now)) {
            total += contractor.spread;
        }
    });
    return total;
}