import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavBarService } from './nav-bar.service';
import { PrintService } from '../shared/print/print.service';
import { AuthService } from '../shared/auth/auth.service';
import { Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';

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
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;

    // Auto-close sidenav on navigation (as per user request)
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this._sidenav && this._sidenav.opened) {
          this._sidenav.close();
        }
      }
    });
  }

  toggleSidenav() {
    if (this._sidenav) {
      this._sidenav.toggle();
    }
  }

  logout() {
    this.authService.logout();
  }

}
