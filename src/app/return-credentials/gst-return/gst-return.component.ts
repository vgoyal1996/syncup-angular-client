import { Component, OnInit } from '@angular/core';
import {SyncupApiService} from 'src/app/shared/api/syncup-api.service';
import {FormGroup, FormBuilder, FormArray, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-gst-return',
  templateUrl: './gst-return.component.html',
  styleUrls: ['./gst-return.component.css']
})
export class GstReturnComponent implements OnInit {

  submitted = false;
  private gstReturnForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService) {
      this.gstReturnForm = this.formBuilder.group({
        returnForms: this.formBuilder.array([
          this.getReturnForm()
        ])
      });
   }

  ngOnInit() {
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

   /*get gstFlatNo(): FormControl[] {
     let flatNoArray: FormControl[];
     for (let returnForm of this.returnForms.controls) {
       flatNoArray.push(returnForm.get('gstFlatNo'));
     }
     return flatNoArray;
   }

   get gstArea() {
     return this.returnForms.get('gstArea') as FormArray;
   }

   get gstCity() {
       return this.returnForms.get('gstCity') as FormArray;
   }

   get gstState() {
     return this.returnForms.get('gstState') as FormArray;
   }

   get gstPin() {
     return this.returnForms.get('gstPin') as FormArray;
   }

   get gstNo() {
     return this.returnForms.get('gstNo') as FormArray;
   }

   get gstUserName() {
     return this.returnForms.get('gstUserName') as FormArray;
   }

   get gstPassword() {
     return this.returnForms.get('gstPassword') as FormArray;
   }*/

    saveReturnInfo(): void {
      this.submitted = true;
      for (let returnForm of this.returnForms.controls) {
        if (returnForm.invalid) {
          return;
        }
      }
      //console.log(this.gstReturnForm);
    }

}
