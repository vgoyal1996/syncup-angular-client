import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SyncupApiService } from 'src/app/shared/api/syncup-api.service';
import { ReturnForm } from 'src/app/model/ReturnForm';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-return-form-dialog',
  templateUrl: './edit-return-form-dialog.component.html',
  styleUrls: ['./edit-return-form-dialog.component.css']
})
export class EditReturnFormDialogComponent implements OnInit {

  private oldReturnType: string;
  private returnForm: FormGroup;
  private oldReturnName: string;

  constructor(private dialogRef: MatDialogRef<EditReturnFormDialogComponent>, private formBuilder: FormBuilder,
    private apiService: SyncupApiService, @Inject(MAT_DIALOG_DATA) private data: any, private snackBar: MatSnackBar,
    private datepipe: DatePipe) {
    console.log(data);
    this.returnForm = formBuilder.group({
      returnFormName: this.formBuilder.control(data.returnForm.formName, Validators.required),
      returnType: this.formBuilder.control(data.returnType, Validators.required),
      periodicity: this.formBuilder.control(data.returnForm.periodicity, Validators.required)
    });
    this.oldReturnType = data.returnType;
    this.oldReturnName = data.returnForm.formName;
  }

  get returnFormName() {
    return this.returnForm.get('returnFormName');
  }

  get periodicity() {
    return this.returnForm.get('periodicity');
  }

  get returnType() {
    return this.returnForm.get('returnType');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  editReturnForm(): void {
    console.log(this.returnForm.get('returnFormName').value);
    console.log(this.returnForm.get('periodicity').value);
    console.log(this.oldReturnType);

    if (this.returnForm.invalid) {
      return;
    }

    const returnFormModel: ReturnForm = new ReturnForm();
    returnFormModel.setFormName = this.returnForm.get('returnFormName').value;
    returnFormModel.setReturnType = this.returnForm.get('returnType').value;
    returnFormModel.setPeriodicity = this.returnForm.get('periodicity').value;


    this.apiService.updateReturnFormByReturnTypeAndReturnName(this.oldReturnType, this.oldReturnName, returnFormModel).subscribe(
      res => {
        console.log(res);
        if (res != null) {
          this.snackBar.open(returnFormModel.getFormName + " Updated", null, {
            duration: 3000,
          });
          this.dialogRef.close(res);
        } else {
          this.snackBar.open(returnFormModel.getFormName + " update failed", null, {
            duration: 3000,
          });
          this.dialogRef.close();
        }
      },
      err => {
        console.log(err);
        this.snackBar.open(err, null, {
          duration: 4000,
        });
        this.dialogRef.close();
      }
    );
  }

}
