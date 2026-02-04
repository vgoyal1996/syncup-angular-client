import { Component, OnInit } from '@angular/core';
import { Login } from '../model/Login';
import { AuthService } from '../shared/auth/auth.service';
import { Router } from '@angular/router';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { NotificationService } from '../shared/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent implements OnInit {

  userId = '';
  password = '';
  hide = true;
  dbLoginModel: Login | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private navBar: NavBarService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.navBar.hide();
    this.navBar.changeToolBarTitle("Login");
    // Clear session on visiting login page
    this.authService.logout();
  }

  checkLogin(): void {
    if (!this.userId || !this.password) {
      return;
    }

    this.authService.login(this.userId, this.password).subscribe(
      user => {
        if (user) {
          this.router.navigateByUrl('/home');
        } else {
          this.notificationService.showError('Invalid User ID or Password');
        }
      },
      err => {
        this.notificationService.showError('Invalid Credentials');
      }
    );
  }
}
