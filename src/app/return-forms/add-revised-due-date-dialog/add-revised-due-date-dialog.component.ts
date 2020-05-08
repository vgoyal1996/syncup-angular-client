import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SyncupApiService } from 'src/app/shared/api/syncup-api.service';
import { ReturnForm } from 'src/app/model/ReturnForm';
import { DatePipe } from '@angular/common';
import { Constants } from 'src/app/shared/global/constants';
import { DueDateScheduler } from 'src/app/model/DueDateScheduler';

@Component({
  selector: 'app-add-revised-due-date-dialog',
  templateUrl: './add-revised-due-date-dialog.component.html',
  styleUrls: ['./add-revised-due-date-dialog.component.css']
})
export class AddRevisedDueDateDialogComponent implements OnInit {
  private revisedDueDateForm: FormGroup;
  private formHeading: string;
  private form: ReturnForm;

  constructor(private dialogRef: MatDialogRef<AddRevisedDueDateDialogComponent>, private formBuilder: FormBuilder,
    private apiService: SyncupApiService, @Inject(MAT_DIALOG_DATA) private data: any, private snackBar: MatSnackBar,
    private datepipe: DatePipe) {
    this.form = data.form;
    this.formHeading = this.form.getFormName;
    this.revisedDueDateForm = this.formBuilder.group({
      periodicity: this.formBuilder.control({value: this.form.getPeriodicity, disabled: true}, Validators.required),
      fromDate: this.formBuilder.control({value: new Date(this.datepipe.transform(new Date(this.form.getDueDateSchedulerSet[0].getStartDate), Constants.DATE_PICKER_FORMAT)), disabled: true}, Validators.required),
      toDate: this.formBuilder.control({value: new Date(this.datepipe.transform(new Date(this.form.getDueDateSchedulerSet[0].getEndDate), Constants.DATE_PICKER_FORMAT)), disabled: true}, Validators.required),
      dueDateOfFiling: this.formBuilder.control({value: new Date(this.datepipe.transform(new Date(this.form.getDueDateSchedulerSet[0].getDueDateOfFiling), Constants.DATE_PICKER_FORMAT)), disabled: true}, Validators.required),
      revisedDueDateOfFiling: this.formBuilder.control('', Validators.required)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get periodicity() {
    return this.revisedDueDateForm.get('periodicity');
  }

  get fromDate() {
    return this.revisedDueDateForm.get('fromDate');
  }

  get toDate() {
    return this.revisedDueDateForm.get('toDate');
  }

  get dueDateOfFiling() {
    return this.revisedDueDateForm.get('dueDateOfFiling');
  }

  get revisedDueDateOfFiling() {
    return this.revisedDueDateForm.get('revisedDueDateOfFiling');
  }

  ngOnInit() {
  }

  addRevisedDueDate() {
    if (this.revisedDueDateForm.invalid) {
      return;
    }

    let scheduler = new DueDateScheduler();
    scheduler.setFormName = this.formHeading;
    scheduler.setStartDate = this.fromDate.value;
    scheduler.setEndDate = this.toDate.value;
    scheduler.setDueDateOfFiling = this.dueDateOfFiling.value;
    scheduler.setRevisedDueDateOfFiling = this.revisedDueDateOfFiling.value;

    this.apiService.addRevisedDueDateOfFiling(this.formHeading, scheduler).subscribe(
      res => {
        if (res != null) {
          this.snackBar.open("Revised due date Updated", null, {
            duration: 3000,
          });
          this.dialogRef.close(res);
        } else {
          this.snackBar.open("OOPS!!! An error occurred", null, {
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
