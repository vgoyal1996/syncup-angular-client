import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SyncupApiService } from 'src/app/shared/api/syncup-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientReturnForms } from 'src/app/model/ClientReturnForms';

@Component({
  selector: 'app-add-return-info-dialog',
  templateUrl: './add-return-info-dialog.component.html',
  styleUrls: ['./add-return-info-dialog.component.css'],
  standalone: false
})
export class AddReturnInfoDialogComponent implements OnInit {
  formInfo: ClientReturnForms;
  addInfoForm: FormGroup;
  formNameHeading: string;
  assessmentYear: string;
  returnId: number;

  constructor(private dialogRef: MatDialogRef<AddReturnInfoDialogComponent>, private formBuilder: FormBuilder,
    private apiService: SyncupApiService, @Inject(MAT_DIALOG_DATA) private data: any, private snackBar: MatSnackBar) {
    this.formInfo = data.clientReturnForm;
    this.formNameHeading = this.formInfo.getReturnForm.getFormName;
    this.assessmentYear = data.assessmentYear;
    this.returnId = data.returnId;
    this.addInfoForm = this.formBuilder.group({
      acknowledgementNo: this.formBuilder.control('', Validators.required),
      dateOfFiling: this.formBuilder.control('', Validators.required),
      whetherEFile: this.formBuilder.control('', Validators.required),
      dateOfPhysicalDeposit: this.formBuilder.control('')
    });
  }

  setOptionalValidators(value) {
    const dateOfPhysicalDeposit = this.addInfoForm.get('dateOfPhysicalDeposit');
    if (value == 'no') {
      dateOfPhysicalDeposit.setValidators(Validators.required);
    } else {
      dateOfPhysicalDeposit.setValidators(null);
    }
    dateOfPhysicalDeposit.updateValueAndValidity();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get acknowledgementNo() {
    return this.addInfoForm.get('acknowledgementNo');
  }

  get dateOfFiling() {
    return this.addInfoForm.get('dateOfFiling');
  }

  get whetherEFile() {
    return this.addInfoForm.get('whetherEFile');
  }

  get dateOfPhysicalDeposit() {
    return this.addInfoForm.get('dateOfPhysicalDeposit');
  }

  ngOnInit() {
  }

  saveFormInfo() {
    if (this.addInfoForm.invalid) {
      return;
    }

    let clientFormInfo: any = {};
    clientFormInfo.acknowledgementNo = this.addInfoForm.get('acknowledgementNo').value;
    clientFormInfo.dateOfFiling = new Date(this.addInfoForm.get('dateOfFiling').value).toISOString().slice(0, 19).replace('T', ' ');
    if (this.addInfoForm.get('dateOfPhysicalDeposit').value != undefined && this.addInfoForm.get('dateOfPhysicalDeposit').value != null) {
      clientFormInfo.dateOfPhysicalDeposit = new Date(this.addInfoForm.get('dateOfPhysicalDeposit').value).toISOString().slice(0, 19).replace('T', ' ');
    }
    clientFormInfo.formName = this.formNameHeading;
    this.apiService.updateClientReturnForm(this.assessmentYear, this.returnId, clientFormInfo).subscribe(
      res => {
        if (res == true) {
          console.log(clientFormInfo.formName + " inserted");
          this.snackBar.open(clientFormInfo.formName + " inserted", null, {
            duration: 3000,
          });
        } else {
          this.snackBar.open("OOPS!!! An error occurred", null, {
            duration: 3000,
          });
        }
      },
      err => {
        this.snackBar.open(err, null, {
          duration: 4000,
        });
      }
    );
    this.dialogRef.close(clientFormInfo);
  }

}
