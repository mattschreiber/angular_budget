import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { SidenavService } from '../services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  ledgerType: string = "ledger";
  budgetType: string = "budget";
  constructor(private sidenavService: SidenavService) { }

  ngOnInit() {
  }

  public toggleSidenav() {
   this.sidenavService.sidenavToggle();
 }

}
