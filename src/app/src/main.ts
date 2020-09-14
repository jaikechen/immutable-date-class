import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { addHours, addMinutes, addMonth, addSeconds, addYears, dateEqual, dateToString, getToday, getWorkDays, parseDate } from './myDate';

const date = new Date()
console.log('original date:' + date)
console.log('after  + 100 seconds : ' + addSeconds(date,100))
console.log('after  + 50 minutes : ' + addMinutes(date,50))
console.log('after  + 25 hours : ' + addHours(date,25))
console.log('after  + 1 year : ' + addYears(date,1))
console.log('after  + 1 month : ' + addMonth(date,1))
console.log('after  + 31 days : ' + addMonth(date,1))
console.log('today:' + getToday())
console.log(dateEqual('9/4/2020', '09/04/2020'))
console.log(parseDate('2020091312000000'))
console.log(dateToString(parseDate('2020091312000000'),'MM/dd/yyyy'))
console.log(parseDate('2002/2/1','yyyy/MM/dd'))
console.log(dateEqual('9/4/2020','2020-9-4','MM/dd/yyyy', 'yyyy-MM-dd'))


//console.log('get work days:' + getWorkDays(new Date()))

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
