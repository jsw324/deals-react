import moment from 'moment';

//get month as an array index, i.e. jan is 0, feb is 1
export var getMonth = (month) => {
    var mom = moment(month, 'MM/DD/YYYY');
    return mom.month();
}