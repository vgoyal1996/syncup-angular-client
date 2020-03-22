import { Component, OnInit } from '@angular/core';
import {SyncupApiService} from 'src/app/shared/api/syncup-api.service';
import {FormGroup, FormBuilder} from '@angular/forms';
import { ReturnCredentials } from '../../model/ReturnCredentials';
import {DataTransferService} from '../../shared/data/data-transfer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-income-tax-return',
  templateUrl: './income-tax-return.component.html',
  styleUrls: ['./income-tax-return.component.css']
})
export class IncomeTaxReturnComponent implements OnInit {

  private clientId: string;
  private incomeTaxReturnForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService, private dataTransferService: DataTransferService, private router: Router) {
    this.incomeTaxReturnForm = formBuilder.group({
            incomeTaxUserName: [''],
            incomeTaxPassword: ['']
          });
  }

  ngOnInit() {
    this.dataTransferService.currentMessage.subscribe(message => this.clientId = message);
  }

  get incomeTaxUserName() {
    return this.incomeTaxReturnForm.get('incomeTaxUserName').value;
  }

  get incomeTaxPassword() {
    return this.incomeTaxReturnForm.get('incomeTaxPassword').value;
  }

  private addIncomeTaxReturnInfo() {
    const incomeTaxCredentials: ReturnCredentials = new ReturnCredentials();
    incomeTaxCredentials.setUserId = this.incomeTaxReturnForm.controls.incomeTaxUserName.value;
    incomeTaxCredentials.setPassword = this.incomeTaxReturnForm.controls.incomeTaxPassword.value;
    incomeTaxCredentials.setId = +this.clientId;
    incomeTaxCredentials.setReturnType = "incomeTax";
    this.apiService.addReturnCredentials(incomeTaxCredentials).subscribe(
      res => {
        console.log(incomeTaxCredentials + " insertion successful")
      },
      err => {
        alert('oops!!! Somthing went wrong');
      }
    );
  }

}
