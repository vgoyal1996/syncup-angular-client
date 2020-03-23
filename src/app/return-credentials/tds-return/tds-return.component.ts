import { Component, OnInit } from '@angular/core';
import {SyncupApiService} from 'src/app/shared/api/syncup-api.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ReturnCredentials} from '../../model/ReturnCredentials';
import {DataTransferService} from '../../shared/data/data-transfer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tds-return',
  templateUrl: './tds-return.component.html',
  styleUrls: ['./tds-return.component.css']
})
export class TdsReturnComponent implements OnInit {

  submitted = false;
  private clientId: string;
  private tdsReturnForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService, private dataTransferService: DataTransferService, private router: Router) {
    this.tdsReturnForm = this.formBuilder.group({
                    tdsTanNo: this.formBuilder.control('', Validators.required),
                    tdsUserName: this.formBuilder.control('', Validators.required),
                    tdsPassword: this.formBuilder.control('', Validators.required),
                    tracesTdsUserName: this.formBuilder.control('', Validators.required),
                    tracesTdsPassword: this.formBuilder.control('', Validators.required)
                  });
   }

  ngOnInit() {
    this.dataTransferService.currentMessage.subscribe(message => this.clientId = message);
  }

  get tdsUserName() {
    return this.tdsReturnForm.get('tdsUserName');
  }

  get tdsPassword() {
    return this.tdsReturnForm.get('tdsPassword');
  }

  get tracesTdsUserName() {
    return this.tdsReturnForm.get('tracesTdsUserName');
  }

  get tracesTdsPassword() {
    return this.tdsReturnForm.get('tracesTdsPassword');
  }

  get tdsTanNo() {
    return this.tdsReturnForm.get('tdsTanNo');
  }

  private addTdsReturnInfo() {
    this.submitted = true;
    if (this.tdsReturnForm.invalid) {
      return;
    }
    console.log(this.tdsReturnForm.value);
    const tdsReturnCredentials: ReturnCredentials = new ReturnCredentials();
    tdsReturnCredentials.setUserId = this.tdsReturnForm.controls.tdsUserName.value;
    tdsReturnCredentials.setPassword = this.tdsReturnForm.controls.tdsPassword.value;
    tdsReturnCredentials.setTracesUserId = this.tdsReturnForm.controls.tracesTdsUserName.value;
    tdsReturnCredentials.setTracesPassword = this.tdsReturnForm.controls.tracesTdsPassword.value;
    tdsReturnCredentials.setTanNo = this.tdsReturnForm.controls.tdsTanNo.value;
    tdsReturnCredentials.setId = +this.clientId;
    tdsReturnCredentials.setReturnType = "tds";
    this.apiService.addReturnCredentials(tdsReturnCredentials).subscribe(
      res => {
        console.log(tdsReturnCredentials + " insertion successful")
      },
      err => {
        alert('oops!!! Somthing went wrong');
      }
    );
  }

}
