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
    console.log('sp', spread);
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
    console.log('sundays', sundays);
    sundays.forEach((date) => {
        spread.forEach((contractor) => {
            var spread;
            if (contractor.isW2 === "1099") {
                sprd = Math.floor((contractor.billRate - (contractor.hourly * 1.05)) * 40);
            } else {
                sprd = Math.floor((contractor.billRate - (contractor.hourly * 1.15)) * 40);
            }
            if (contractor.completedDate === '') {
                var completedDate = "01/01/2100";
            } else {
                completedDate = formatDate(contractor.completedDate);
            }
            var startDate = formatDate(contractor.startDate);
            if (moment(date).isBefore(completedDate) && moment(date).isAfter(startDate)) {
                console.log(moment(date).isBefore(completedDate));
                console.log(moment(date).isAfter(startDate));
                console.log('sprd', sprd);
                console.log('---');
                weeklySpread += sprd;
            }
        });
        spreadByDate.push({
            date: date,
            spread: weeklySpread
        });
        weeklySpread = 0;
    });
    console.log('BYDATE', spreadByDate);
}