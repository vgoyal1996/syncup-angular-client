import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SyncupApiService } from '../../shared/api/syncup-api.service';
import { ReturnForm } from '../../model/ReturnForm';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-return-form-dialog',
  templateUrl: './add-return-form-dialog.component.html',
  styleUrls: ['./add-return-form-dialog.component.css']
})
export class AddReturnFormDialogComponent implements OnInit {

  private returnType: string;
  private returnForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddReturnFormDialogComponent>, private formBuilder: FormBuilder,
    private apiService: SyncupApiService, @Inject(MAT_DIALOG_DATA) private data: any, private snackBar: MatSnackBar) {
    this.returnForm = formBuilder.group({
      returnFormName: this.formBuilder.control('', Validators.required),
      periodicity: this.formBuilder.control('', Validators.required),
      dueDateOfFiling: this.formBuilder.control('', Validators.required)
    });
    this.returnType = data.returnType;
  }

  get returnFormName() {
    return this.returnForm.get('returnFormName');
  }

  get periodicity() {
    return this.returnForm.get('periodicity');
  }

  get dueDateOfFiling() {
    return this.returnForm.get('dueDateOfFiling');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  addNewReturnForm(): void {
    console.log(this.returnForm.get('returnFormName').value);
    console.log(this.returnForm.get('periodicity').value);
    console.log(new Date(this.returnForm.get('dueDateOfFiling').value).toISOString().slice(0, 19).replace('T', ' '));
    console.log(this.returnType);

    if (this.returnForm.invalid) {
      return;
    }

    const returnFormModel: ReturnForm = new ReturnForm(this.returnForm.get('returnFormName').value,
      this.returnType,
      new Date(this.returnForm.get('dueDateOfFiling').value).toISOString().slice(0, 19).replace('T', ' '),
      this.returnForm.get('periodicity').value);

    this.apiService.addReturnForm(returnFormModel).subscribe(
      res => {
        console.log(returnFormModel.getFormName + " inserted");
        this.snackBar.open(returnFormModel.getFormName + " inserted", null, {
          duration: 3000,
        });
      },
      err => {
        this.snackBar.open(err, null, {
          duration: 4000,
        });
      }
    );
    this.dialogRef.close(returnFormModel);
  }

}