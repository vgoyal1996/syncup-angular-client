import { Component, OnInit } from '@angular/core';
import {SyncupApiService} from 'src/app/shared/api/syncup-api.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ReturnCredentials} from '../../model/ReturnCredentials';
import {DataTransferService} from '../../shared/data/data-transfer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-roc-return',
  templateUrl: './roc-return.component.html',
  styleUrls: ['./roc-return.component.css']
})
export class RocReturnComponent implements OnInit {

  submitted = false;
  private clientId: string;
  private rocReturnForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService, private dataTransferService: DataTransferService, private router: Router) {
    this.rocReturnForm = this.formBuilder.group({
                rocUserName: this.formBuilder.control('', Validators.required),
                rocPassword: this.formBuilder.control('', Validators.required)
              });
   }

  ngOnInit() {
    this.dataTransferService.currentMessage.subscribe(message => this.clientId = message);
  }

  get rocUserName() {
      return this.rocReturnForm.get('rocUserName');
    }

    get rocPassword() {
      return this.rocReturnForm.get('rocPassword');
    }

    addRocReturnInfo() {
      this.submitted = true;
      if (this.rocReturnForm.invalid) {
        return;
      }
      console.log(this.rocReturnForm);
      const rocReturnCredentials: ReturnCredentials = new ReturnCredentials();
      rocReturnCredentials.setUserId = this.rocReturnForm.controls.rocUserName.value;
      rocReturnCredentials.setPassword = this.rocReturnForm.controls.rocPassword.value;
      rocReturnCredentials.setId = +this.clientId;
      rocReturnCredentials.setReturnType = "roc";
      this.apiService.addReturnCredentials(rocReturnCredentials).subscribe(
        res => {
          console.log(rocReturnCredentials + " insertion successful")
        },
        err => {
          alert('oops!!! Somthing went wrong');
        }
      );
    }

}
