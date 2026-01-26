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
  assessmentYears = [
    { value: '2019-20', viewValue: '2019-20' },
    { value: '2020-21', viewValue: '2020-21' }
  ];
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
