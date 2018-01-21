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

  listOfYears(): number[] {
    let startYear: number = 2017;
    let currentYear: number = new Date().getFullYear();
    let years: number[] = [];

    let numYears: number = currentYear - startYear;

    for (var i=0; i <= numYears; i++) {
      years.push(currentYear);
      currentYear = currentYear - 1;
    }
    return years;
  }

  subtractMonth(date: Date, numMonths: number): Date {
    date.setMonth(date.getMonth() - numMonths);
    return date;
  }

  addMonth(date: Date, numMonths: number): Date {
    date.setMonth(date.getMonth() + numMonths);
    return date;
  }

  // let months: string[] = [];
  // let d = new Date(), locale = "en-us";
  // for (let i=0; i<12; i++) {
  //   months[i] = d.toLocaleString(locale, { month: "long" });
  //   d.setMonth(d.getMonth()-1);
  // }
  // console.log(months.reverse());

  // firstOfMonth(val: Date): string {
  //   console.log('first of month: ' + val);
  //   let parseDate = new Date(Date.parse(val + 'EST'));
  //   let firstDay = parseDate.getFullYear()+'-'+(parseDate.getMonth()+1)+'-'+1;
  //   return firstDay;
  // }
  //
  // lastOfMonth(val: Date): string {
  //   console.log("last of month " + val);
  //   let selectedDate = new Date(Date.parse(val + 'EST'));
  //   let parseDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
  //   let lastDayMonth  = parseDate.getFullYear()+'-'+(parseDate.getMonth()+1)+'-'+parseDate.getDate();
  //   return lastDayMonth;
  // }
}
