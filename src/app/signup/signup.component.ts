import { Component, OnInit } from '@angular/core';
import {SyncupApiService} from '../shared/api/syncup-api.service';
import {Router} from '@angular/router';
import { NavBarService } from '../nav-bar/nav-bar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpModel = {
    loginId: -1,
    userId: '',
    password: '',
    confirmPassword: ''
   };

  constructor(private apiService: SyncupApiService, private router: Router, private navBar: NavBarService) { }

  ngOnInit() {
    this.navBar.hide();
    this.navBar.changeToolBarTitle("Sign Up");
  }

  createAccount() {
    this.apiService.createAccount(this.signUpModel).subscribe(
      res => {
        this.router.navigateByUrl('/addclient').then((e) => {
          if (e) {
            console.log('Navigation to addClient Page successful');
          } else {
            console.log('Navigation to addClient Page failed');
          }
        });
      },
      err => {
        alert('oops!!! Somthing went wrong\n' + err);
      }
    );
  }
}
