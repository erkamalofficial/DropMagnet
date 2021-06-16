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