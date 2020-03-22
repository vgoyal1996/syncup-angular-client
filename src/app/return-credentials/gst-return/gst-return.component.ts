import { Component, OnInit } from '@angular/core';
import {SyncupApiService} from 'src/app/shared/api/syncup-api.service';
import {FormGroup, FormBuilder, FormArray, Validators} from '@angular/forms';

@Component({
  selector: 'app-gst-return',
  templateUrl: './gst-return.component.html',
  styleUrls: ['./gst-return.component.css']
})
export class GstReturnComponent implements OnInit {

  /*private gstReturnForm: FormGroup;*/

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
       gstFlatNo: [null, [Validators.required]],
       gstArea: [null, [Validators.required]],
       gstCity: [null, [Validators.required]],
       gstState: [null, [Validators.required]],
       gstPin: [null, [Validators.required]],
       gstNo: [null, [Validators.required]],
       gstUserName: [null, [Validators.required]],
       gstPassword: [null, [Validators.required]]
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

   get gstFlatNo() {
     return this.gstReturnForm.get('gstFlatNo') as FormArray;
   }

   get gstArea() {
     return this.gstReturnForm.get('gstArea') as FormArray;
   }

   get gstCity() {
       return this.gstReturnForm.get('gstCity') as FormArray;
   }

   get gstState() {
     return this.gstReturnForm.get('gstState') as FormArray;
   }

   get gstPin() {
     return this.gstReturnForm.get('gstPin') as FormArray;
   }

   get gstNo() {
     return this.gstReturnForm.get('gstNo') as FormArray;
   }

   get gstUserName() {
     return this.gstReturnForm.get('gstUserName') as FormArray;
   }

   get gstPassword() {
     return this.gstReturnForm.get('gstPassword') as FormArray;
   }

   saveReturnInfo(): void {

   }

}
