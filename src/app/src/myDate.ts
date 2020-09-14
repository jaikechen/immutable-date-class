
type dateType = string | number | Date
export function addSeconds(d:dateType, val:number)
{
    const myDate = new Date(d)
    myDate.setSeconds(myDate.getSeconds() + val)
    return myDate
}
export function addMinutes(d:dateType, val:number)
{
    const myDate = new Date(d)
    myDate.setMinutes(myDate.getMinutes() + val)
    return myDate
}

export function addHours(d:dateType, val:number)
{
    const myDate = new Date(d)
    myDate.setHours(myDate.getHours() + val)
    return myDate
}
export function addYears(d:dateType, val:number)
{
    const myDate = new Date(d)
    myDate.setFullYear(myDate.getFullYear() + val)
    return myDate
}
export function addMonth(d:dateType, val:number)
{
    const myDate = new Date(d)
    myDate.setMonth(myDate.getMonth() + val)
    return myDate
}
export function addDays(d:dateType, val:number)
{
    const myDate = new Date(d)
    myDate.setDate(myDate.getDate() + val)
    return myDate
}

export function getToday(){
    return getDate(new Date())
}

export function getDate(d: dateType){
    const myDate = new Date(d)
    return new Date(myDate.toLocaleDateString())
}

export function getWorkDays(myDate: dateType) {
    const monday = addDays(myDate, 1- new Date(myDate).getDay() )
    return [0,1,2,3,4].map(x => getDate(addDays(monday, x)) )
}

export function timeEqual(d1: dateType, d2: dateType){
	return  new Date(d1).getTime() == new Date(d2).getTime()
}

export function dateEqual(d1: dateType, d2: dateType, d1format:string = undefined, d2format:string = undefined){
    let date1 = d1format ? parseDate(d1 as string, d1format): new Date(d1)
    let date2 = d2format ? parseDate(d2 as string, d2format): new Date(d2)
    return date1.toLocaleDateString() === date1.toLocaleDateString()
}

function myParseNumber(s:string, format:string, key:string ) {
    const start = format.indexOf(key)
    const length = key.length
    return +s.substr(start,length)
}

const isNumber = (c:string) => '0123456789'.indexOf(c) > -1

function parseNumber (s:string, start:number, length:number){
    let i = start
    for (; i < start + length && isNumber(s[i]) ; i++){}
    const val = +s.substr(start,i - start) 
    for (; i < s.length && !isNumber(s[i]); i++){ }
    return {val, i}
}
export function parseDate (s:string, format:string = 'yyyyMMddhhmmss') {
    const arr = ['yyyy', 'MM', 'dd', 'hh', 'mm', 'ss']
    const indexArr = arr.map((x,i)=>({ key:arr[i],index: format.indexOf(x), val:0}))
    const sorted = indexArr
        .filter(x=>x.index > -1)
        .sort((x,y)=> x.index < y.index? -1 :x.index === y.index ? 0 : 1)
    let start = sorted[0].index
    for (const k of sorted){
        const result = parseNumber(s, start,k.key.length)
        k.val = result.val
        start = result.i
    }
    const date = new Date(indexArr[0].val, indexArr[1].val -1 , indexArr[2].val, 
        indexArr[3].val, indexArr[4].val,indexArr[5].val)
    return date
}

export function dateToString(d :Date, format:string = 'yyyy-MM-dd hh:mm:ss') {
    const myDate = new Date(d)
    const result = format
        .replace('yyyy', myDate.getFullYear().toString())
        .replace('MM', myToString(myDate.getMonth() + 1,2))
        .replace('dd', myToString(myDate.getDate(),2))
        .replace('hh', myToString(myDate.getHours(),2))
        .replace('mm', myToString(myDate.getMinutes(),2))
        .replace('ss', myToString(myDate.getSeconds(),2))
    return result
}

function myToString(n:number, length:number){
    let leadNumber = 1;
    for(let i = 0 ; i < length; i ++)
    {
        leadNumber *= 10;
    }
    return (leadNumber + n).toString().substr(1)
}