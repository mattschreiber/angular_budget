import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  todayDate = new Date();
  firstDayMonth = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), 1);
  lastDayMonth = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth() + 1, 0);
  constructor() { }

  parseDate(val): string {
    let selectedDate: string;
    if (typeof val === "string") {
      let temp = val.split('/');
      selectedDate = temp[2] + '-' + temp[0] + '-' + temp[1];
    }else {
      let placeholder: Date = val;
      let temp = placeholder.toLocaleDateString().split('/');
      selectedDate = temp[2] + '-' + temp[0] + '-' + temp[1];
    }
    // let parseDate = new Date(Date.parse(val + 'EST'));
    // selectedDate = parseDate.getFullYear()+'-'+(parseDate.getMonth()+1)+'-'+parseDate.getDate();
    return selectedDate;
  }

  firstOfMonth(val: Date): string {
    console.log('first of month: ' + val);
    let parseDate = new Date(Date.parse(val + 'EST'));
    let firstDay = parseDate.getFullYear()+'-'+(parseDate.getMonth()+1)+'-'+1;
    return firstDay;
  }

  lastOfMonth(val: Date): string {
    console.log("last of month " + val);
    let selectedDate = new Date(Date.parse(val + 'EST'));
    let parseDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    let lastDayMonth  = parseDate.getFullYear()+'-'+(parseDate.getMonth()+1)+'-'+parseDate.getDate();
    return lastDayMonth;
  }
}
