import {parseDate,dateEqual, getToday} from 'immutable-date-lib'
import { immutableDate } from './dateFunctions'
console.log(parseDate('20201010090000','yyyyMMddhhmmss',true))

console.log(dateEqual('9/4/2020','2020-9-4','MM/dd/yyyy', 'yyyy-MM-dd'))
console.log(dateEqual('9/4/2020','2020-09-04'))
console.log(getToday().addYears(1))
console.log(immutableDate().toArray())
console.log(immutableDate().dateToString('yyyy)MM)dd)h:mm:ss'))