import { Component, OnInit } from '@angular/core';
import {SyncupApiService} from 'src/app/shared/api/syncup-api.service';
import {FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-roc-return',
  templateUrl: './roc-return.component.html',
  styleUrls: ['./roc-return.component.css']
})
export class RocReturnComponent implements OnInit {

  private rocReturnForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService) {
    this.rocReturnForm = formBuilder.group({
                rocUserName: [''],
                rocPassword: ['']
              });
   }

  ngOnInit() {
  }

  get incomeTaxUserName() {
      return this.rocReturnForm.get('rocUserName').value;
    }

    get incomeTaxPassword() {
      return this.rocReturnForm.get('rocPassword').value;
    }

    private addRocReturnInfo() {
      console.log(this.rocReturnForm.value);
    }

}
