import {parseDate,dateEqual, getToday} from 'immutable-date-lib'
import { getTimeSpan, immutableDate } from './dateFunctions'

//console.log(immutableDate().getTimeSpan(immutableDate().addHours(1).addMinutes(2).addSeconds(3)))
//console.log(immutableDate().addHours(-19).dateToString('h:mm tt'))
console.log(immutableDate().chainSetHours(0).chainSetMinutes(0).chainSetSeconds(0).chainSetMilliseconds(0).chainSetFullYear(2021).chainSetMonth(1))