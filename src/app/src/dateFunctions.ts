export {}
declare global {
    interface Date {
        addDays(days: number): Date
        addYears(year: number): Date
        addMonths(year: number): Date
        addHours(year: number): Date
        addMinutes(year: number): Date
        addSeconds(year: number): Date

        timeEqual(date1: dateType): Boolean
        dateEqual(date1: dateType): Boolean
        getDatePart():Date

        dateToString(format: string): string
    }
}

Date.prototype.addDays = function (val: number) {
    return addDays(this, val)
}
Date.prototype.addYears = function (val: number) {
    return addYears(this, val)
}
Date.prototype.addMonths = function (val: number) {
    return addMonths(this, val)
}
Date.prototype.addHours = function (val: number) {
    return addHours(this, val)
}
Date.prototype.addMinutes = function (val: number) {
    return addMinutes(this, val)
}
Date.prototype.addSeconds = function (val: number) {
    return addSeconds(this, val)
}

Date.prototype.dateToString = function (format: string) {
    return dateToString(this, format)
}

Date.prototype.getDatePart = function(){
    return getDatePart(this)
}
Date.prototype.dateEqual = function (val:dateType, dateFormat:string = undefined){
    return dateEqual(this, val, undefined, dateFormat)
}
Date.prototype.timeEqual = function( val:dateType) {
    return timeEqual(this,val)
}

export type dateType = string | number | Date

export function immutableDate(d:dateType = '') {
    return d? new Date(d):new Date()
}

export function addSeconds(d: dateType, val: number) {
    const myDate = new Date(d)
    myDate.setSeconds(myDate.getSeconds() + val)
    return myDate
}

export function addMinutes(d: dateType, val: number) {
    const myDate = new Date(d)
    myDate.setMinutes(myDate.getMinutes() + val)
    return myDate
}

export function addHours(d: dateType, val: number) {
    const myDate = new Date(d)
    myDate.setHours(myDate.getHours() + val)
    return myDate
}
export function addYears(d: dateType, val: number) {
    const myDate = new Date(d)
    myDate.setFullYear(myDate.getFullYear() + val)
    return myDate
}
export function addMonths(d: dateType, val: number) {
    const myDate = new Date(d)
    myDate.setMonth(myDate.getMonth() + val)
    return myDate
}
export function addDays(d: dateType, val: number): Date {
    const myDate = new Date(d)
    myDate.setDate(myDate.getDate() + val)
    return myDate
}

export function getToday() {
    return getDatePart(new Date())
}

export function getDatePart(d: dateType) {
    const myDate = new Date(d)
    return new Date(myDate.toLocaleDateString())
}

export function timeEqual(d1: dateType, d2: dateType) {
    return new Date(d1).getTime() == new Date(d2).getTime()
}

export function dateEqual(d1: dateType, d2: dateType,
    d1format: string | undefined = undefined, d2format: string | undefined = undefined) {
    let date1 = d1format ? parseDate(d1 as string, d1format) : new Date(d1)
    let date2 = d2format ? parseDate(d2 as string, d2format) : new Date(d2)
    return date1.toLocaleDateString() === date2.toLocaleDateString()
}


export function parseDate(s: string, format: string, isUtc: boolean = false) {
    if (!s) {
        throw Error('Invalid Date')
    }

    const arr = ['yyyy', 'MM', 'dd', 'hh', 'mm', 'ss']
    const indexArr = arr.map((x, i) => ({ key: arr[i], index: format.indexOf(x), val: 0 }))
    const sorted = indexArr
        .filter(x => x.index > -1)
        .sort((x, y) => x.index < y.index ? -1 : x.index === y.index ? 0 : 1)
    let start = sorted[0].index
    for (const k of sorted) {
        const result = parseNumber(s, start, k.key.length)
        k.val = result.val
        start = result.i
    }
    const [year, month, date, hour, minute, second] = [indexArr[0].val, indexArr[1].val - 1, indexArr[2].val,
    indexArr[3].val, indexArr[4].val, indexArr[5].val]

    return isUtc ?
        new Date(`${year}-${myToString(month, 2)}-${myToString(date, 2)}T${myToString(hour,2)}:${myToString(minute,2)}:${myToString(second,2)}Z`)
        : new Date(year,month,date,hour,minute,second)
}

export function dateToString(d: dateType, format: string = 'yyyy-MM-dd hh:mm:ss') {
    const myDate = new Date(d)
    const hour = myDate.getHours()
    const halfHour = hour === 0 ? 12 : hour % 12
    const result = format
        .replace('yyyy', myDate.getFullYear().toString())
        .replace('MMM', myDate.toLocaleString('default', { month: 'long' }))
        .replace('MM', myToString(myDate.getMonth() + 1, 2))
        .replace('ddd', myDate.toLocaleString('default', { weekday: 'long' }))
        .replace('dd', myToString(myDate.getDate(), 2))
        .replace('HH', myToString(hour, 2))
        .replace('hh', myToString(halfHour, 2))
        .replace('h', halfHour.toString())
        .replace('mm', myToString(myDate.getMinutes(), 2))
        .replace('ss', myToString(myDate.getSeconds(), 2))
        .replace('tt', myDate.getHours() >= 12 ? 'pm' : 'am')
    return result
}

function myToString(n: number, length: number) {
    let leadNumber = 1;
    for (let i = 0; i < length; i++) {
        leadNumber *= 10;
    }
    return (leadNumber + n).toString().substr(1)
}

function isNumber(c: string) {
    return '0123456789'.indexOf(c) > -1
}

function parseNumber(s: string, start: number, length: number) {
    let i = start
    for (; i < start + length && isNumber(s[i]); i++) { }
    const val = +s.substr(start, i - start)
    for (; i < s.length && !isNumber(s[i]); i++) { }
    return { val, i }
}