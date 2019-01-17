import { Component, OnInit } from '@angular/core';
import {SyncupApiService} from '../shared/syncup-api.service';
import {Router} from '@angular/router';

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

  constructor(private apiService: SyncupApiService, private router: Router) { }

  ngOnInit() {
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
