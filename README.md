# why this lib
1. Every function returns a new Object instead of change the original object. This makes your code safe!
2. It was wrote in typescript, you get the type check and intelligence sense if you also use typescript.
3. It add functions to default Date Object, most of the function returns Date Object, so you can do function chaining.
```typescript
getToday().addDays(1).addHours(3).toIsoString()
```
4. The default Date Constructor can parse string to Date, but it is not too straightforward,
it seems to me that new Date('9/4/2020') and new Date('2020-09-04') are the same date? but it isn't 
``` typescript
 new Date('9/4/2020').getTime() === new Date('2020-09-04').getTime() // return false
```
the parseDate()  gives you control of how to convert string to date
# usage
|function name| return value| added to Default Date Prototype|
|-|-|-|
|addDays|Date|yes
|addYears|Date|yes
|addMonths|Date|yes
|addHours|Date|yes
|addMinutes|Date|yes
|addSeconds|Date|yes
|chainSetFullYear|Date|yes
|chainSetMonth|Date|yes
|chainSetDate|Date|yes
|chainSetHours|Date|yes
|chainSetMinutes|Date|yes
|chainSetSeconds|Date|yes
|chainSetMilliseconds|Date|yes
|getDatePart|Date|yes
|dateToString|string|yes
|toArray|number|yes
|dateEqual|Boolean|yes
|timeEqual|Boolean|yes
|getTimeSpan|timeSpan|yes
|immutableDate|Date|no
|getToday|Date|no
|parseDate|Date|no
## function chaining
Some functions are added to the Date Prototype, so you can chain function calls 
```
getToday().addDays(1)
immutableDate().addDays(1).addHours(1)
```
<b>Directly call new Date().addMinutes(1) will NOT work. </b>

## setDate() vs chainSetDate()
the default setDate() function of Date returns a number and is not immutable. chainSetDate() reduces 3 line of code to one line.
- with setDate
```typescript
const newDate = new Date(originalDate)
newDate().setDate(1)
console.log(newDate)
```
- with chainSetDate
```typescript
console.log(immutableDate(originalDate).setDate(1))
```

## time span
the function getTimeSpan return timeSpan type, it calculates the time span between two times.
```typescript
export interface timeSpan{
    years:number
    totalMonths:number
    totalDays:number
    totalHours:number
    totalMinutes:number
    totalSeconds:number
}
```
## dateType
most of the functions take parameters of string or date or number. 
```typescript
type dateType = string | number | Date
```
so you don't need to convert string/number to date before you call the function. Instead of 
```
getToday().dateEqual(new Date(10/10/2020))
```
you can write
```
getToday().dateEqual('10/10/2020')
```
## immutableDate()
it use default javascript date constructor, if you don't pass any parameter, it return current time.
```typescript
export function immutableDate(d:dateType = '') {
    return d? new Date(d):new Date()
}
```
## parseDate
```typescript
export function parseDate(s: string, format: string, isUtc: boolean = false) 
```
I made this function for 2 reasons,

1. the default new Date() give me different date than I expect, for example, I get string from database in '2020-01-01' format,
I know it means local date, but javascript default new Date('2020-01-01'), thinks it is iso data. 
for this example, I will use
```typescript
parseDate('2020-01-01', 'yyyy-MM-dd'),// it will give me local date.
```
2. some string format are not support by new Data, like 20200101, I will use
```typescript
parseDate('20200101', 'yyyyMMdd')
```
## getDate and getToday
get the date part of a Date, it will be local time 12:00 am

## timeEqual
if two data object has same time
```typescript
console.log(new Date('9/4/2020') === new Date('9/4/2020'))//false
console.log(timeEqual('9/4/2020','9/4/2020')) //true
```


## dateEqual
like timeEqual, but only compares Date Part of Date<br/>
```typescript
 new Date('9/4/2020').getTime() === new Date('2020-09-04').getTime()
```
the above line returns false, because java scripts thins 9/4/2020 is local time, 2020-09-04 is iso time
```typescript
console.log(new Date('9/4/2020'))       //2020-09-04T04:00:00.000Z
console.log(new Date('2020-09-04'))     //2020-09-04T00:00:00.000Z
```

so DateEqual function has two extra parameter
```typescript
export function dateEqual(d1: dateType, d2: dateType, d1format:string = undefined, d2format:string = undefined)
```
so if you set date format yourself, you can make sure the you get expected date.
```typescript
console.log(dateEqual('9/4/2020','2020-09-04','MM/dd/yyyy', 'yyyy-MM-dd'))
```



## dateToString
```typescript
console.log(dateToString(new Date(),'yyyyMMdd')) //20200916
console.log(dateToString('8/1/2020', 'ddd, MMM, dd yyyy')) //Saturday, August, 01 2020
```
|||
|-|-|
|yyyy | year 
|MMM| month name, e.g. March, October
|MM | month
|ddd| week of the day
|dd| date
|HH| hour 24 hour format
|hh| hour 12 hour format, always display 2 digitals
|h| hour 12 hour format,display 1 digital if it is less than 10 
|mm| minute
|ss| seconds
|tt| am or pm

## toArray
```typescript
    return [myDate.getFullYear(), myDate.getMonth() +1, myDate.getDate(), myDate.getHours(), myDate.getMinutes(), myDate.getSeconds(), myDate.getMilliseconds()]
```
sometime it is convenient to get all the variables in one line code
```typescript
    const [year,month,date] = immutableDate().toArray()
```