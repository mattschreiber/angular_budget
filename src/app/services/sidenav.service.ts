import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable()
export class SidenavService {
  private sidenav: MatSidenav;
  constructor() { }

  public setSidenav(sidenav: MatSidenav) {
   this.sidenav = sidenav;
 }

 public sidenavToggle() {
   this.sidenav.toggle();
 }

 public closeSidenav() {
   this.sidenav.close();
 }

}
