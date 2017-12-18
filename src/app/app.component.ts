import { Component, ViewChild, OnInit } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import { SidenavService } from './services/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ledgerType: string = "ledger";
  budgetType: string = "budget";
  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private sidenavService: SidenavService ){}

  ngOnInit(): void {
  // Store sidenav to service
  this.sidenavService
    .setSidenav(this.sidenav);
  }
}
