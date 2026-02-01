import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavBarService } from './nav-bar.service';
import { PrintService } from '../shared/print/print.service';
import { AuthService } from '../shared/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: false
})
export class NavBarComponent implements OnInit {
  private _sidenav: MatSidenav;
  isLoggedIn$: Observable<boolean>;

  @ViewChild('sidenav')
  set sidenav(value: MatSidenav) {
    this._sidenav = value;
    this.navBar.setSidenav(value);
  }

  get sidenav(): MatSidenav {
    return this._sidenav;
  }

  constructor(
    public navBar: NavBarService,
    public printService: PrintService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  toggleSidenav() {
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }

  logout() {
    this.authService.logout();
  }

}
