import Moment from 'moment';

export function epochToDayMonth(epochTime) {
  let date = new Date(epochTime * 1000)
  let moment = new Moment(date)
  return moment.format('Do of MMMM')
}

export function epochToDayMonthHour(epochTime) {
  let date = new Date(epochTime * 1000)
  let moment = new Moment(date);
  return moment.format('DD/MM/YYYY hh:mm A')
}

export function formatDate(time, past=false){
  let date = new Date(time);
  let moment = new Moment(date);
  if(past)return moment.fromNow();
  else return moment.toNow();
}

export function calcTime(offset) {

  let d = new Date();
  let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  let nd = new Date(utc + (3600000*offset));
 
  // return time as a string
  return nd;
}
