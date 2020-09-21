# why this lib
1. the default javascript/typescript Date is mutable, which is annoying, if you call myDate.setHour(0), then the original value is missing.
2. is '9/4/2020' and '2020-09-04' same date? is the following true or false?
``` typescript
 new Date('9/4/2020').getTime() === new Date('2020-09-04').getTime()
```
I had a lot of trouble with javascript/typescript Date(), so I decided to put my solutions in this package.

# class vs function
this package exports a lot of functions, no class, I hope people can resolve their issue in one line of code. 

# usage

## dateType
most of the functions takes a parameter of type dateType. 
```typescript
type dateType = string | number | Date
```

## add hours
### definition
```typescript
export function addHours(d:dateType, val:number)
```
### example
```typescript
const data = addHours('9/16/2020',5)
console.log(data.toLocaleString())
```

## addYear, addMonth, addDays, addMinutes, addSeconds
they are similar with addHours

## getDate and getToday
get the date part of a Date, it will be local time 12:00 am

## getWorkDay
get work day of current week

## timeEqual
```typescript
console.log(new Date('9/4/2020') === new Date('9/4/2020'))//false
console.log(timeEqual('9/4/2020','9/4/2020')) //true
```
Date is an object, so it compares reference of the two objects, it returns false;
the timeEqual function compare date value, it returns true

## dateEqual
like timeEqual, but only compares Date Part of Date<br/>
it is time to answer the questions above, 
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
console.log(dateEqual('9/4/2020','2020-9-4','MM/dd/yyyy', 'yyyy-MM-dd'))
```
## parseDate
I made this function for 2 reasons,
1. the default new Date() give me different date than I expect, for example, I get string from database in '2020-01-01' format,
I know it means local date, but javascript default new Date('2020-01-01'), thinks it is iso data. 
for this example, I will use
```typescript
parseDate('2020-01-01', 'yyyy-MM-dd'), it will give me local date.
```

2. some string format are not support by new Data, like 20200101, I will use
```typescript
parseDate('20200101', 'yyyyMMdd'), it will give me local date.
```

## dateToString
```typescript
console.log(dateToString(new Date(),'yyyyMMdd'))
```
returns 20200916

