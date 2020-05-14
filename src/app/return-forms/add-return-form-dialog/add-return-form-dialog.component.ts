import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SyncupApiService } from '../../shared/api/syncup-api.service';
import { ReturnForm } from '../../model/ReturnForm';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Constants } from 'src/app/shared/global/constants';

@Component({
  selector: 'app-add-return-form-dialog',
  templateUrl: './add-return-form-dialog.component.html',
  styleUrls: ['./add-return-form-dialog.component.css']
})
export class AddReturnFormDialogComponent implements OnInit {

  private returnType: string;
  private returnForm: FormGroup;
  private monthList = Constants.MONTHS_LIST;
  private dayList = Constants.DAY_LIST;
  private isNotMonthly = true;
  private isNotYearly = true;
  private isNotQuarterly = true;

  constructor(private dialogRef: MatDialogRef<AddReturnFormDialogComponent>, private formBuilder: FormBuilder,
    private apiService: SyncupApiService, @Inject(MAT_DIALOG_DATA) private data: any, private snackBar: MatSnackBar) {
    this.returnForm = formBuilder.group({
      returnFormName: this.formBuilder.control('', Validators.required),
      periodicity: this.formBuilder.control('', Validators.required),
      monthlyDayOccurrence: this.formBuilder.control(''),
      yearlyDayOccurrence: this.formBuilder.control(''),
      yearlyMonthOccurrence: this.formBuilder.control(''),
      firstQuarterDayOccurrence: this.formBuilder.control(''),
      firstQuarterMonthOccurrence: this.formBuilder.control(''),
      secondQuarterDayOccurrence: this.formBuilder.control(''),
      secondQuarterMonthOccurrence: this.formBuilder.control(''),
      thirdQuarterDayOccurrence: this.formBuilder.control(''),
      thirdQuarterMonthOccurrence: this.formBuilder.control(''),
      fourthQuarterDayOccurrence: this.formBuilder.control(''),
      fourthQuarterMonthOccurrence: this.formBuilder.control('')
    });
    this.returnType = data.returnType;
  }

  get returnFormName() {
    return this.returnForm.get('returnFormName');
  }

  get periodicity() {
    return this.returnForm.get('periodicity');
  }

  get monthlyDayOccurrence() {
    return this.returnForm.get('monthlyDayOccurrence');
  }

  get yearlyDayOccurrence() {
    return this.returnForm.get('yearlyDayOccurrence');
  }

  get yearlyMonthOccurrence() {
    return this.returnForm.get('yearlyMonthOccurrence');
  }

  get firstQuarterDayOccurrence() {
    return this.returnForm.get('firstQuarterDayOccurrence');
  }

  get firstQuarterMonthOccurrence() {
    return this.returnForm.get('firstQuarterMonthOccurrence');
  }

  get secondQuarterDayOccurrence() {
    return this.returnForm.get('secondQuarterDayOccurrence');
  }

  get secondQuarterMonthOccurrence() {
    return this.returnForm.get('firstQuarterMonthOccurrence');
  }

  get thirdQuarterDayOccurrence() {
    return this.returnForm.get('thirdQuarterDayOccurrence');
  }

  get thirdQuarterMonthOccurrence() {
    return this.returnForm.get('firstQuarterMonthOccurrence');
  }

  get fourthQuarterDayOccurrence() {
    return this.returnForm.get('fourthQuarterDayOccurrence');
  }

  get fourthQuarterMonthOccurrence() {
    return this.returnForm.get('firstQuarterMonthOccurrence');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  getFormPeriodicityAndSetOptionalValidators() {
    if (this.periodicity.value == 'monthly') {
      this.isNotMonthly = false;
      this.isNotYearly = true;
      this.isNotQuarterly = true;
      this.monthlyDayOccurrence.setValidators(Validators.required);
      this.yearlyDayOccurrence.setValidators(null);
      this.firstQuarterDayOccurrence.setValidators(null);
      this.secondQuarterDayOccurrence.setValidators(null);
      this.thirdQuarterDayOccurrence.setValidators(null);
      this.fourthQuarterDayOccurrence.setValidators(null);
      this.yearlyMonthOccurrence.setValidators(null);
      this.firstQuarterMonthOccurrence.setValidators(null);
      this.secondQuarterMonthOccurrence.setValidators(null);
      this.thirdQuarterMonthOccurrence.setValidators(null);
      this.fourthQuarterMonthOccurrence.setValidators(null);
    } else if (this.periodicity.value == 'yearly') {
      this.isNotYearly = false;
      this.isNotMonthly = true;
      this.isNotQuarterly = true;
      this.monthlyDayOccurrence.setValidators(null);
      this.yearlyDayOccurrence.setValidators(Validators.required);
      this.firstQuarterDayOccurrence.setValidators(null);
      this.secondQuarterDayOccurrence.setValidators(null);
      this.thirdQuarterDayOccurrence.setValidators(null);
      this.fourthQuarterDayOccurrence.setValidators(null);
      this.yearlyMonthOccurrence.setValidators(Validators.required);
      this.firstQuarterMonthOccurrence.setValidators(null);
      this.secondQuarterMonthOccurrence.setValidators(null);
      this.thirdQuarterMonthOccurrence.setValidators(null);
      this.fourthQuarterMonthOccurrence.setValidators(null);
    } else {
      this.isNotQuarterly = false;
      this.isNotMonthly = true;
      this.isNotYearly = true;
      this.monthlyDayOccurrence.setValidators(null);
      this.yearlyDayOccurrence.setValidators(null);
      this.firstQuarterDayOccurrence.setValidators(Validators.required);
      this.secondQuarterDayOccurrence.setValidators(Validators.required);
      this.thirdQuarterDayOccurrence.setValidators(Validators.required);
      this.fourthQuarterDayOccurrence.setValidators(Validators.required);
      this.yearlyMonthOccurrence.setValidators(null);
      this.firstQuarterMonthOccurrence.setValidators(Validators.required);
      this.secondQuarterMonthOccurrence.setValidators(Validators.required);
      this.thirdQuarterMonthOccurrence.setValidators(Validators.required);
      this.fourthQuarterMonthOccurrence.setValidators(Validators.required);
    }
    this.monthlyDayOccurrence.updateValueAndValidity();
    this.yearlyDayOccurrence.updateValueAndValidity();
    this.firstQuarterDayOccurrence.updateValueAndValidity();
    this.secondQuarterDayOccurrence.updateValueAndValidity();
    this.thirdQuarterDayOccurrence.updateValueAndValidity();
    this.fourthQuarterDayOccurrence.updateValueAndValidity();
    this.yearlyMonthOccurrence.updateValueAndValidity();
    this.firstQuarterMonthOccurrence.updateValueAndValidity();
    this.secondQuarterMonthOccurrence.updateValueAndValidity();
    this.thirdQuarterMonthOccurrence.updateValueAndValidity();
    this.fourthQuarterMonthOccurrence.updateValueAndValidity();
  }

  addNewReturnForm(): void {
    console.log(this.returnForm.value);

    if (this.returnForm.invalid) {
      return;
    }

    const returnFormModel: ReturnForm = new ReturnForm();
    returnFormModel.setFormName = this.returnForm.get('returnFormName').value;
    returnFormModel.setReturnType = this.returnType;
    returnFormModel.setPeriodicity = this.returnForm.get('periodicity').value;
    if (this.periodicity.value == 'monthly') {
      returnFormModel.setMonthlyDayOccurrence = this.monthlyDayOccurrence.value;
    } else if (this.periodicity.value == 'yearly') {
      returnFormModel.setYearlyDayOccurrence = this.yearlyDayOccurrence.value;
      returnFormModel.setYearlyMonthOccurrence = this.yearlyMonthOccurrence.value;
    } else {
      returnFormModel.setFirstQuarterDayOccurrence = this.firstQuarterDayOccurrence.value;
      returnFormModel.setSecondQuarterDayOccurrence = this.secondQuarterDayOccurrence.value;
      returnFormModel.setThirdQuarterDayOccurrence = this.thirdQuarterDayOccurrence.value;
      returnFormModel.setFourthQuarterDayOccurrence = this.fourthQuarterDayOccurrence.value;
      returnFormModel.setFirstQuarterMonthOccurrence = this.firstQuarterMonthOccurrence.value;
      returnFormModel.setSecondQuarterMonthOccurrence = this.secondQuarterMonthOccurrence.value;
      returnFormModel.setThirdQuarterMonthOccurrence = this.thirdQuarterMonthOccurrence.value;
      returnFormModel.setFourthQuarterMonthOccurrence = this.fourthQuarterMonthOccurrence.value;
    }

    this.apiService.addReturnForm(returnFormModel).subscribe(
      res => {
        console.log(returnFormModel.getFormName + " inserted");
        this.snackBar.open(returnFormModel.getFormName + " inserted", null, {
          duration: 3000,
        });
        this.dialogRef.close(res);
      },
      err => {
        this.snackBar.open(err, null, {
          duration: 4000,
        });
        this.dialogRef.close();
      }
    );
  }

}