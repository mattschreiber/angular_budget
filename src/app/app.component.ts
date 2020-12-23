import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {MatSidenav} from '@angular/material/sidenav';
import { SidenavService } from './services/sidenav.service';
import { map } from 'rxjs/operators';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  ledgerType = 'ledger';
  budgetType = 'budget';
  ledgerUrl = 'ledger-entries';
  budgetUrl = 'budget-entries';
  displayType: string;
  opened = false;
  @ViewChild('sidenav') public sidenav: MatSidenav;

  // used to determine screen size
  watcher: Subscription;
  activeMediaQuery = '';
  close: boolean;

  constructor(private sidenavService: SidenavService,  private media: MediaObserver ) {
    this.watcher = media.asObservable()
    .pipe(
      filter((changes: MediaChange[]) => changes.length > 0),
      map((changes: MediaChange[]) => changes[0])
    ).subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
        if ( change.mqAlias === 'xs' || change.mqAlias === 'sm') {
         this.displayType = 'over';
         this.close = true;
         this.opened = false;
        } else {
         this.displayType = 'side';
         this.close = false;
         this.opened = false;
       }
    })
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
