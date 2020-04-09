import { Component, OnInit } from '@angular/core';
import {SyncupApiService} from 'src/app/shared/api/syncup-api.service';
import {FormGroup, FormBuilder} from '@angular/forms';
import {ReturnCredentials} from '../../model/ReturnCredentials';
import {DataTransferService} from '../../shared/data/data-transfer.service';
import { ApplicableReturnFormsService } from '../applicable-return-forms.service';

@Component({
  selector: 'app-roc-return',
  templateUrl: './roc-return.component.html',
  styleUrls: ['./roc-return.component.css']
})
export class RocReturnComponent implements OnInit {

  submitted = false;
  private clientId: string;
  private rocReturnForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService, private dataTransferService: DataTransferService, 
              private applicableReturnFormsService: ApplicableReturnFormsService) {
    this.rocReturnForm = this.formBuilder.group({
                rocUserName: this.formBuilder.control(''),
                rocPassword: this.formBuilder.control('')
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
      if (this.applicableReturnFormsService.getSelectedReturnForms == undefined || 
        this.applicableReturnFormsService.getSelectedReturnForms == []) {
          return;
      }
      console.log(this.rocReturnForm);
      const rocReturnCredentials: ReturnCredentials = new ReturnCredentials();
      rocReturnCredentials.setUserId = this.rocReturnForm.controls.rocUserName.value;
      rocReturnCredentials.setPassword = this.rocReturnForm.controls.rocPassword.value;
      rocReturnCredentials.setId = +this.clientId;
      rocReturnCredentials.setReturnType = "roc";
      rocReturnCredentials.setApplicableReturnForms = this.applicableReturnFormsService.getSelectedReturnForms;
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
