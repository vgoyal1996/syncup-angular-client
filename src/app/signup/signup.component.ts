import { Component, OnInit } from '@angular/core';
import { SyncupApiService } from '../shared/api/syncup-api.service';
import { Router } from '@angular/router';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { NotificationService } from '../shared/notification/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: false
})
export class SignupComponent implements OnInit {

  signUpModel = {
    loginId: 0,
    userId: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private apiService: SyncupApiService,
    private router: Router,
    private navBar: NavBarService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.navBar.hide();
    this.navBar.changeToolBarTitle("Sign Up");
  }

  createAccount() {
    this.apiService.createAccount(this.signUpModel).subscribe(
      res => {
        this.notificationService.showSuccess('Account created successfully! Please login.');
        this.router.navigate(['/login']);
      },
      err => {
        if (err.status === 409) {
          this.notificationService.showError('User ID already exists. Please choose a different one.');
        } else {
          this.notificationService.showError('Something went wrong. Please try again.');
        }
      }
    );
  }
}
