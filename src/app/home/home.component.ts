import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  projBalance: number;
  // minDate = new Date(2000, 0, 1);
  maxDate = new Date(2020, 11, 21);
  date = new FormControl(new Date());

  todayDate = this.maxDate.getFullYear()+'-'+(this.maxDate.getMonth()+1)+'-'+this.maxDate.getDate();
  // serializedDate = new FormControl((new Date()).toISOString());

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getProjectedValue(this.todayDate);
  }

  updateEndDate(val: Date): void {
    let parseDate = new Date(Date.parse(val + 'EST'));
    let endDate = parseDate.getFullYear()+'-'+(parseDate.getMonth()+1)+'-'+parseDate.getDate();
    this.getProjectedValue(endDate);
    console.log(endDate);
  }

  getProjectedValue(today: string): void {
    const href = 'http://localhost:5000/home/';
    const requestUrl =`${href}${today}`;
    this.http.get<ProjectedBalance>(requestUrl)
    .subscribe(data => {
     this.projBalance = data.projBalance * .01;
   },
   (err: HttpErrorResponse) => {
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
        console.log('An error occurred:', err.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        this.projBalance = null;
        console.log(`Backend returned code ${err.status}, body was: ${err.error}`)
      }
    }
 );// end current
  }
}

export interface ProjectedBalance {
  projBalance: number;
}
