import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SyncupApiService } from 'src/app/shared/api/syncup-api.service';
import { ReturnForm } from 'src/app/model/ReturnForm';
import { DatePipe } from '@angular/common';
import { Constants } from 'src/app/shared/global/constants';
import { DueDateScheduler } from 'src/app/model/DueDateScheduler';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-add-revised-due-date-dialog',
  templateUrl: './add-revised-due-date-dialog.component.html',
  styleUrls: ['./add-revised-due-date-dialog.component.css'],
  standalone: false
})
export class AddRevisedDueDateDialogComponent implements OnInit {
  revisedDueDateForm: FormGroup;
  formHeading: string;
  form: ReturnForm;

  constructor(
    private dialogRef: MatDialogRef<AddRevisedDueDateDialogComponent>,
    private formBuilder: FormBuilder,
    private apiService: SyncupApiService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private notificationService: NotificationService,
    private datepipe: DatePipe
  ) {
    this.form = data.form;
    this.formHeading = this.form.getFormName;

    // Simplified form - only the essential fields
    const currentDueDate = this.form.getDueDateSchedulerSet?.[0]?.getDueDateOfFiling
      ? new Date(this.form.getDueDateSchedulerSet[0].getDueDateOfFiling)
      : null;

    const existingRevisedDate = this.form.getDueDateSchedulerSet?.[0]?.getRevisedDueDateOfFiling
      ? new Date(this.form.getDueDateSchedulerSet[0].getRevisedDueDateOfFiling)
      : null;

    this.revisedDueDateForm = this.formBuilder.group({
      dueDateOfFiling: this.formBuilder.control({ value: currentDueDate, disabled: true }),
      revisedDueDateOfFiling: this.formBuilder.control(existingRevisedDate, Validators.required)
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
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

    // Build the scheduler payload
    let scheduler = new DueDateScheduler();
    scheduler.setRevisedDueDateOfFiling = this.revisedDueDateOfFiling.value;

    this.apiService.addRevisedDueDateOfFiling(this.formHeading, scheduler).subscribe(
      res => {
        if (res != null) {
          this.notificationService.showSuccess("Revised due date saved for " + this.formHeading);
          this.dialogRef.close(res);
        } else {
          this.notificationService.showError("Failed to save revised due date");
          this.dialogRef.close();
        }
      },
      err => {
        console.log(err);
        this.notificationService.showError(err.message || "An error occurred");
        this.dialogRef.close();
      }
    );
  }
}
