import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  todayDate = new Date();
  firstDayMonth = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), 1);
  lastDayMonth = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth() + 1, 0);
  constructor() { }

  parseDate(val: Date): string {
    let parseDate = new Date(Date.parse(val + 'EST'));
    let selectedDate = parseDate.getFullYear()+'-'+(parseDate.getMonth()+1)+'-'+parseDate.getDate();
    return selectedDate;
  }

  firstOfMonth(val: Date): string {
    let parseDate = new Date(Date.parse(val + 'EST'));
    let firstDay = parseDate.getFullYear()+'-'+(parseDate.getMonth()+1)+'-'+1;
    return firstDay;
  }

  lastOfMonth(val: Date): string {
    let selectedDate = new Date(Date.parse(val + 'EST'));
    let parseDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    let lastDayMonth  = parseDate.getFullYear()+'-'+(parseDate.getMonth()+1)+'-'+parseDate.getDate();
    return lastDayMonth;
  }

}
