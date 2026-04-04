import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { DeleteClientsDialogComponent } from '../delete-clients-dialog/delete-clients-dialog.component';
import { Client } from 'src/app/model/Client';
import { DataTransferService } from 'src/app/shared/data/data-transfer.service';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-assessment-year-dialog',
  templateUrl: './assessment-year-dialog.component.html',
  styleUrls: ['./assessment-year-dialog.component.css'],
  standalone: false
})
export class AssessmentYearDialogComponent implements OnInit {
  assessmentYears: { value: string, viewValue: string }[] = [];

  generateAssessmentYears() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); // 0-indexed, Jan is 0

    // In India, AY starts from April. 
    // If it's April or later, the current AY is currentYear-(currentYear+1)
    // If it's before April, the current AY is (currentYear-1)-currentYear
    let startYear = (currentMonth >= 3) ? currentYear : currentYear - 1;

    // Provide 5 years including the current one
    for (let i = 0; i < 5; i++) {
      const year = startYear - i;
      const ayString = `${year}-${(year + 1).toString().slice(-2)}`;
      this.assessmentYears.push({ value: ayString, viewValue: ayString });
    }
  }
  selectedClient: Client;
  selectForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<AssessmentYearDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
    private router: Router, private dataTransferService: DataTransferService, private formBuilder: FormBuilder) {
    this.selectedClient = data.selectedClient;
    this.selectForm = this.formBuilder.group({
      selected: this.formBuilder.control('', Validators.required)
    });
  }

  get selected() {
    return this.selectForm.get('selected');
  }

  ngOnInit() {
    this.generateAssessmentYears();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  navigateToSelectedClientMaster() {
    if (this.selectForm.invalid) {
      console.log(this.selectForm);
      return;
    }
    this.dataTransferService.updateSelectedClient(this.selectedClient);
    this.dataTransferService.updateAssessmentYear(this.selected.value);
    this.dialogRef.close();
    this.router.navigateByUrl('/selected-client-master');
  }

}
