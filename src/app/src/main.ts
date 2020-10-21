import {parseDate,dateEqual, getToday} from 'immutable-date-lib'
import { getTimeSpan, immutableDate } from './dateFunctions'

//console.log(immutableDate().getTimeSpan(immutableDate().addHours(1).addMinutes(2).addSeconds(3)))
console.log(immutableDate().addHours(-19).dateToString('h:mm tt'))