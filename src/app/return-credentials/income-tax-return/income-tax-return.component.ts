import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SyncupApiService } from 'src/app/shared/api/syncup-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReturnCredentials } from '../../model/ReturnCredentials';
import { DataTransferService } from '../../shared/data/data-transfer.service';
import { ApplicableReturnFormsService } from '../applicable-return-forms.service';
import { SelectionModel } from '@angular/cdk/collections';
import { forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReturnForm } from 'src/app/model/ReturnForm';

@Component({
  selector: 'app-income-tax-return',
  templateUrl: './income-tax-return.component.html',
  styleUrls: ['./income-tax-return.component.css'],
  standalone: false
})
export class IncomeTaxReturnComponent implements OnInit {

  submitted = false;
  selection = new SelectionModel(true, []);
  displayedColumns: string[] = ['select', 'formName', 'periodicity', 'dueDateOfFiling'];
  dataSource: ReturnForm[] = [];
  clientId: string;
  incomeTaxReturnForm: FormGroup;
  @Output() isSaved: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  assessmentYear: string;
  editFlag: boolean;
  incomeTaxCred: ReturnCredentials;

  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService, private dataTransferService: DataTransferService,
    private applicableReturnFormsService: ApplicableReturnFormsService, private snackBar: MatSnackBar) {
    this.incomeTaxReturnForm = formBuilder.group({
      incomeTaxUserName: this.formBuilder.control('', Validators.required),
      incomeTaxPassword: this.formBuilder.control('', Validators.required)
    });
  }

  ngOnInit() {
    forkJoin([this.dataTransferService.currentMessage.pipe(first()), this.dataTransferService.currentAssessmentYear.pipe(first()),
    this.applicableReturnFormsService.currentDataSource.pipe(first())]).subscribe(results => {
      this.clientId = results[0];
      this.assessmentYear = results[1];
      this.dataSource = this.applicableReturnFormsService.getDataSourceByReturnType('incomeTax');
      this.dataTransferService.currentEditReturnCredentialsFlag.subscribe(flag => {
        this.editFlag = flag;
        if (flag == true) {
          this.dataTransferService.currentReturnCredentialsArrayForEdit.subscribe(creds => {
            this.incomeTaxCred = creds.filter(cred => cred.getReturnType == 'incomeTax')[0];
            this.incomeTaxReturnForm.setValue({
              incomeTaxUserName: this.incomeTaxCred.getUserId,
              incomeTaxPassword: this.incomeTaxCred.getPassword
            });
            this.incomeTaxCred.getReturnFormsList.forEach(clientReturnForm => {
              this.selection.select(this.dataSource.find(form => form.getFormName == clientReturnForm.getReturnForm.getFormName));
              this.applicableReturnFormsService.addSelectedReturnForm('incomeTax', clientReturnForm.getReturnForm.getFormName);
            });
          });
        }
      });
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.applicableReturnFormsService.clearSelectedReturnForms('incomeTax');
    } else {
      this.dataSource.forEach(row => {
        this.selection.select(row);
        this.applicableReturnFormsService.addSelectedReturnForm('incomeTax', row.getFormName);
      });
    }
  }

  toggleSelection(row: any) {
    this.selection.toggle(row);
    if (this.selection.isSelected(row)) {
      this.applicableReturnFormsService.addSelectedReturnForm('incomeTax', row.formName);
    } else {
      this.applicableReturnFormsService.removeReturnForm('incomeTax', row.formName);
    }
  }

  get incomeTaxUserName() {
    return this.incomeTaxReturnForm.get('incomeTaxUserName');
  }

  get incomeTaxPassword() {
    return this.incomeTaxReturnForm.get('incomeTaxPassword');
  }

  addIncomeTaxReturnInfo() {
    this.submitted = true;
    if (this.incomeTaxReturnForm.invalid) {
      return;
    }
    if (this.applicableReturnFormsService.getSelectedReturnForms == undefined ||
      this.applicableReturnFormsService.getSelectedReturnForms('incomeTax') == undefined ||
      this.applicableReturnFormsService.getSelectedReturnForms('incomeTax').length === 0) {
      return;
    }
    const incomeTaxCredentials: ReturnCredentials = new ReturnCredentials();
    incomeTaxCredentials.setUserId = this.incomeTaxReturnForm.controls.incomeTaxUserName.value;
    incomeTaxCredentials.setAssessmentYear = this.assessmentYear;
    incomeTaxCredentials.setPassword = this.incomeTaxReturnForm.controls.incomeTaxPassword.value;
    incomeTaxCredentials.setReturnType = "incomeTax";
    incomeTaxCredentials.setApplicableReturnForms = this.applicableReturnFormsService.getSelectedReturnForms('incomeTax');
    if (this.editFlag == false) {
      this.apiService.addReturnCredentials(this.clientId, incomeTaxCredentials).subscribe(
        res => {
          console.log(incomeTaxCredentials + " insertion successful");
          this.isSaved.emit(true);
          this.snackBar.open("Income Tax Credentials inserted", null, {
            duration: 3000,
          });
        },
        err => {
          this.snackBar.open("OOPS!!! An error Occurred", null, {
            duration: 4000,
          });
          console.log(err);
        }
      );
    } else {
      this.apiService.updateReturnCredentialsByReturnId(this.assessmentYear, this.incomeTaxCred.getReturnId, incomeTaxCredentials)
        .subscribe(
          res => {
            if (res == true) {
              this.snackBar.open("Income Tax Credentials Updated", null, {
                duration: 3000,
              });
            } else {
              this.snackBar.open("Error Updating Income Tax Credentials", null, {
                duration: 3000,
              });
            }
          },
          err => {
            this.snackBar.open("OOPS!!! An error Occurred", null, {
              duration: 4000,
            });
            console.log(err);
          }
        );
    }
  }

}
