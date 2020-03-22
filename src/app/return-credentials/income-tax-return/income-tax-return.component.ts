import { Component, OnInit } from '@angular/core';
import {SyncupApiService} from 'src/app/shared/api/syncup-api.service';
import {FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-income-tax-return',
  templateUrl: './income-tax-return.component.html',
  styleUrls: ['./income-tax-return.component.css']
})
export class IncomeTaxReturnComponent implements OnInit {

  private incomeTaxReturnForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService) {
    this.incomeTaxReturnForm = formBuilder.group({
            incomeTaxUserName: [''],
            incomeTaxPassword: ['']
          });
  }

  ngOnInit() {
  }

  get incomeTaxUserName() {
    return this.incomeTaxReturnForm.get('incomeTaxUserName').value;
  }

  get incomeTaxPassword() {
    return this.incomeTaxReturnForm.get('incomeTaxPassword').value;
  }

  private addIncomeTaxReturnInfo() {
    console.log(this.incomeTaxReturnForm.value);
  }

}
