import { Component, OnInit } from '@angular/core';
import {SyncupApiService} from 'src/app/shared/api/syncup-api.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ReturnCredentials } from '../../model/ReturnCredentials';
import {DataTransferService} from '../../shared/data/data-transfer.service';
import { ApplicableReturnFormsService } from '../applicable-return-forms.service';

@Component({
  selector: 'app-income-tax-return',
  templateUrl: './income-tax-return.component.html',
  styleUrls: ['./income-tax-return.component.css']
})
export class IncomeTaxReturnComponent implements OnInit {

  submitted = false;
  private clientId: string;
  private incomeTaxReturnForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService, private dataTransferService: DataTransferService, 
              private applicableReturnFormsService: ApplicableReturnFormsService) {
    this.incomeTaxReturnForm = formBuilder.group({
            incomeTaxUserName: this.formBuilder.control('', Validators.required),
            incomeTaxPassword: this.formBuilder.control('', Validators.required)
          });
  }

  ngOnInit() {
    this.dataTransferService.currentMessage.subscribe(message => this.clientId = message);
  }

  get incomeTaxUserName() {
    return this.incomeTaxReturnForm.get('incomeTaxUserName');
  }

  get incomeTaxPassword() {
    return this.incomeTaxReturnForm.get('incomeTaxPassword');
  }

  addIncomeTaxReturnInfo() {
    this.submitted = true;
    if (this.incomeTaxReturnForm.invalid) {
      return;
    }
    if (this.applicableReturnFormsService.getSelectedReturnForms == undefined || 
      this.applicableReturnFormsService.getSelectedReturnForms == []) {
        return;
    }
    const incomeTaxCredentials: ReturnCredentials = new ReturnCredentials();
    incomeTaxCredentials.setUserId = this.incomeTaxReturnForm.controls.incomeTaxUserName.value;
    incomeTaxCredentials.setPassword = this.incomeTaxReturnForm.controls.incomeTaxPassword.value;
    incomeTaxCredentials.setId = +this.clientId;
    incomeTaxCredentials.setReturnType = "incomeTax";
    incomeTaxCredentials.setApplicableReturnForms = this.applicableReturnFormsService.getSelectedReturnForms;
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
