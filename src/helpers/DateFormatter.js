import Moment from 'moment';

export function epochToDayMonth(epochTime) {
  let date = new Date(epochTime * 1000)
  let moment = new Moment(date)
  return moment.format('Do of MMMM')
}

export function epochToDayMonthHour(epochTime) {
  let date = new Date(epochTime * 1000)
  let moment = new Moment(date)
  return moment.format('DD/MM/YYYY hh:mm A')
}