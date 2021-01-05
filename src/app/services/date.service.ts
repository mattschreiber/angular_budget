import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

  // first and last day of current month
  todayDate = new Date();
  firstDayMonth = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth(), 1);
  lastDayMonth = new Date(this.todayDate.getFullYear(), this.todayDate.getMonth() + 1, 0);
  constructor() { }

  parseDate(val): string {
    let selectedDate: string;
    if (typeof val === 'string') {
      const temp = val.split('/');
      selectedDate = temp[2] + '-' + temp[0] + '-' + temp[1];
    }else {
      const placeholder: Date = val;
      const temp = placeholder.toLocaleDateString().split('/');
      selectedDate = temp[2] + '-' + temp[0] + '-' + temp[1];
    }
    // let parseDate = new Date(Date.parse(val + 'EST'));
    // selectedDate = parseDate.getFullYear()+'-'+(parseDate.getMonth()+1)+'-'+parseDate.getDate();
    return selectedDate;
  }

  listOfYears(): number[] {
    const startYear = 2017;
    let currentYear: number = new Date().getFullYear();
    const years: number[] = [];

    const numYears: number = currentYear - startYear;

    for (let i = 0; i <= numYears; i++) {
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

  // first day of any month and year
  getFirstDayMonth(month: number, year: number): Date {
    let firstDay = new Date(year, month, 1);
    return firstDay;
  }
  // last day of any month and year
  getLastDayMonth(month: number, year: number): Date {
    let lastDay = new Date(year, month+1, 0);
    return lastDay;
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
