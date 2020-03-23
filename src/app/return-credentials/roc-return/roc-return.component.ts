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

  private clientId: string;
  private rocReturnForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService, private dataTransferService: DataTransferService, private router: Router) {
    this.rocReturnForm = formBuilder.group({
                rocUserName: [null, [Validators.required]],
                rocPassword: [null, [Validators.required]]
              });
   }

  ngOnInit() {
    this.dataTransferService.currentMessage.subscribe(message => this.clientId = message);
  }

  get incomeTaxUserName() {
      return this.rocReturnForm.get('rocUserName').value;
    }

    get incomeTaxPassword() {
      return this.rocReturnForm.get('rocPassword').value;
    }

    private addRocReturnInfo() {
      console.log(this.rocReturnForm.value);
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
