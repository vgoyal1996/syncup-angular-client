import { Component, OnInit } from '@angular/core';
import {Login} from '../model/Login';
import {SyncupApiService} from '../shared/api/syncup-api.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import { NavBarService } from '../nav-bar/nav-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel: Login = {
    loginId: -1,
    userId: '',
    password: ''
  };

  adminLoginModel: Login = {
    loginId: -1,
    userId: '',
    password: ''
  };

  openForm = false;
  dbLoginModel: Login;

  constructor(private apiService: SyncupApiService, private router: Router, private navBar: NavBarService) {

  }

  ngOnInit() {
    this.navBar.hide();
    this.navBar.changeToolBarTitle("Login");
  }

  onClickOpenForm(): boolean {
    this.openForm = true;
    return this.openForm;
  }

  checkCredentialsAndLogin(form: NgForm): void {
    this.apiService.checkLoginCredentials(this.loginModel.userId).subscribe(
      res => {
        if (res === null) {
          form.controls['password'].setErrors({validationFailed: true});
        } else {
          this.dbLoginModel = res;
          if ((this.loginModel.userId === this.dbLoginModel.userId) && (this.loginModel.password === this.dbLoginModel.password)) {
            this.router.navigateByUrl('/home').then((e) => {
              if (e) {
                console.log('Navigation to home Page successful');
              } else {
                console.log('Navigation to home Page failed');
              }
            });
          }
        }
      },
      err => {
        alert('oops!!! Somthing went wrong \n' + err);
      }
    );
  }

  validateAdminAndOpenSignUp(form: NgForm) {
    this.apiService.checkLoginCredentials(this.adminLoginModel.userId).subscribe(
      res => {
        if (res === null) {
          form.controls['adminPassword'].setErrors({validationFailed: true});
        } else {
          this.dbLoginModel = res;
          if ((this.adminLoginModel.userId === this.dbLoginModel.userId) && (this.adminLoginModel.password === this.dbLoginModel.password)) {
            this.router.navigateByUrl('/signup').then((e) => {
              if (e) {
                console.log('Navigation to SignUp Page successful');
              } else {
                console.log('Navigation to SignUp Page failed');
              }
            });
          }
        }
      },
      err => {
        alert('oops!!! Somthing went wrong \n' + err);
      }
    );
  }
}
