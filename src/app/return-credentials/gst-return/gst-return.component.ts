import { Component, OnInit } from '@angular/core';
import {SyncupApiService} from 'src/app/shared/api/syncup-api.service';
import {FormGroup, FormBuilder, FormArray, Validators, FormControl} from '@angular/forms';
import { ReturnCredentials } from '../../model/ReturnCredentials';
import {DataTransferService} from '../../shared/data/data-transfer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gst-return',
  templateUrl: './gst-return.component.html',
  styleUrls: ['./gst-return.component.css']
})
export class GstReturnComponent implements OnInit {

  private clientId: string;
  private gstReturnForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService, private dataTransferService: DataTransferService, private router: Router) {
      this.gstReturnForm = this.formBuilder.group({
        returnForms: this.formBuilder.array([
          this.getReturnForm()
        ])
      });
   }

  ngOnInit() {
    this.dataTransferService.currentMessage.subscribe(message => this.clientId = message);
  }

   getReturnForm(): FormGroup {
     return this.formBuilder.group({
       gstFlatNo: this.formBuilder.control('', Validators.required),
       gstArea: this.formBuilder.control('', Validators.required),
       gstCity: this.formBuilder.control('', Validators.required),
       gstState: this.formBuilder.control('', Validators.required),
       gstPin: this.formBuilder.control('', Validators.required),
       gstNo: this.formBuilder.control('', Validators.required),
       gstUserName: this.formBuilder.control('', Validators.required),
       gstPassword: this.formBuilder.control('', Validators.required)
     })
   }

   addReturnForm(): void {
     const returnFormArray = this.gstReturnForm.controls['returnForms'] as FormArray;
     returnFormArray.push(this.getReturnForm());
   }

   removeReturnForm(rowIndex: number): void {
     const returnFormArray = <FormArray>this.gstReturnForm.controls['returnForms'];
     if(returnFormArray.length > 1) {
       returnFormArray.removeAt(rowIndex);
     }
   }

   get returnForms(): FormArray {
    return this.gstReturnForm.get('returnForms') as FormArray;
   }

    saveReturnInfo(): void {
      if (this.gstReturnForm.invalid) {
        alert("GST Return Form is invalid");
        return;
      }
      for (const control of (<FormArray>this.gstReturnForm.get('returnForms')).controls) {
        const gstCredentials: ReturnCredentials = new ReturnCredentials();
        gstCredentials.setId = +this.clientId;
        gstCredentials.setFlatNo = control.get('gstFlatNo').value;
        gstCredentials.setArea = control.get('gstArea').value;
        gstCredentials.setCity = control.get('gstCity').value;
        gstCredentials.setState = control.get('gstState').value;
        gstCredentials.setPin = control.get('gstPin').value;
        gstCredentials.setGstNo = control.get('gstNo').value;
        gstCredentials.setUserId = control.get('gstUserName').value;
        gstCredentials.setPassword = control.get('gstPassword').value;
        gstCredentials.setReturnType = "gst";
        this.apiService.addReturnCredentials(gstCredentials).subscribe(
          res => {
            console.log(gstCredentials + " insertion successful")
          },
          err => {
            alert('oops!!! Somthing went wrong');
          }
        );
      }
    }
}
