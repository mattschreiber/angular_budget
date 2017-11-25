import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  todayDate = new Date();

  constructor() { }

  parseDate(val: Date): string {
    let parseDate = new Date(Date.parse(val + 'EST'));
    let endDate = parseDate.getFullYear()+'-'+(parseDate.getMonth()+1)+'-'+parseDate.getDate();
    return endDate;
  }

}
