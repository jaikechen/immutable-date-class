import { addDays, dateEqual, parseDate } from './dateFunctions'
import {immutableDate} from './index'
console.log(parseDate('20201010090000','yyyyMMddhhmmss',true))

console.log(dateEqual('9/4/2020','2020-9-4','MM/dd/yyyy', 'yyyy-MM-dd'))
console.log(dateEqual('9/4/2020','2020-09-04'))
