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

  private clientId: string;
  private tdsReturnForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService, private dataTransferService: DataTransferService, private router: Router) {
    this.tdsReturnForm = this.formBuilder.group({
                    tdsTanNo: [null, [Validators.required]],
                    tdsUserName: [null, [Validators.required]],
                    tdsPassword: [null, [Validators.required]],
                    tracesTdsUserName: [null, [Validators.required]],
                    tracesTdsPassword: [null, [Validators.required]]
                  });
   }

  ngOnInit() {
    this.dataTransferService.currentMessage.subscribe(message => this.clientId = message);
  }

  private addTdsReturnInfo() {
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
