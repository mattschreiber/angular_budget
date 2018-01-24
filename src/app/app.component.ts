import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
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
  ledgerUrl: string = "ledger-entries";
  budgetUrl: string = "budget-entries";
  displayType: string;
  opened: boolean = true;
  @ViewChild('sidenav') public sidenav: MatSidenav;

  // used to determine screen size
  watcher: Subscription;
  activeMediaQuery = "";
  close: boolean;

  constructor(private sidenavService: SidenavService,  private media: ObservableMedia ){
    this.watcher = media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : "";
      if ( change.mqAlias == 'xs' || change.mqAlias == 'sm') {
         this.displayType = "over";
         this.close = true;
         this.opened = false;
       }
       else {
         this.displayType = "side";
         this.close = false;
         this.opened = true;
       }
     });
  }

  ngOnInit(): void {
  // Store sidenav to service
  this.sidenavService
    .setSidenav(this.sidenav);
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  closeSidenav() {
    if (this.close === true) {
      this.sidenavService.closeSidenav();
    }
  }
}
