import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SyncupApiService } from 'src/app/shared/api/syncup-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReturnCredentials } from '../../model/ReturnCredentials';
import { DataTransferService } from '../../shared/data/data-transfer.service';
import { ApplicableReturnFormsService } from '../applicable-return-forms.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ReturnForm } from 'src/app/model/ReturnForm';
import { forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tds-return',
  templateUrl: './tds-return.component.html',
  styleUrls: ['./tds-return.component.css'],
  standalone: false
})
export class TdsReturnComponent implements OnInit {

  submitted = false;
  selection = new SelectionModel(true, []);
  displayedColumns: string[] = ['select', 'formName', 'periodicity', 'dueDateOfFiling'];
  dataSource: ReturnForm[] = [];
  clientId: string;
  tdsReturnForm: FormGroup;
  @Output() isSaved: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  assessmentYear: string;
  editFlag: boolean;
  tdsCred: ReturnCredentials;

  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService, private dataTransferService: DataTransferService,
    private applicableReturnFormsService: ApplicableReturnFormsService, private snackBar: MatSnackBar) {
    this.tdsReturnForm = this.formBuilder.group({
      tdsTanNo: this.formBuilder.control('', Validators.required),
      tdsUserName: this.formBuilder.control('', Validators.required),
      tdsPassword: this.formBuilder.control('', Validators.required),
      tracesTdsUserName: this.formBuilder.control('', Validators.required),
      tracesTdsPassword: this.formBuilder.control('', Validators.required)
    });
  }

  ngOnInit() {
    forkJoin([this.dataTransferService.currentMessage.pipe(first()), this.dataTransferService.currentAssessmentYear.pipe(first()),
    this.applicableReturnFormsService.currentDataSource.pipe(first())]).subscribe(results => {
      this.clientId = results[0];
      this.assessmentYear = results[1];
      this.dataSource = this.applicableReturnFormsService.getDataSourceByReturnType('tds');
      this.dataTransferService.currentEditReturnCredentialsFlag.subscribe(flag => {
        this.editFlag = flag;
        if (flag == true) {
          this.dataTransferService.currentReturnCredentialsArrayForEdit.subscribe(creds => {
            this.tdsCred = creds.filter(cred => cred.getReturnType == 'tds')[0];
            this.tdsReturnForm.setValue({
              tdsTanNo: this.tdsCred.getTanNo,
              tdsUserName: this.tdsCred.getUserId,
              tdsPassword: this.tdsCred.getPassword,
              tracesTdsPassword: this.tdsCred.getTracesPassword,
              tracesTdsUserName: this.tdsCred.getTracesUserId
            });
            this.tdsCred.getReturnFormsList.forEach(clientReturnForm => {
              this.selection.select(this.dataSource.find(form => form.getFormName == clientReturnForm.getReturnForm.getFormName));
              this.applicableReturnFormsService.addSelectedReturnForm('tds', clientReturnForm.getReturnForm.getFormName);
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
      this.applicableReturnFormsService.clearSelectedReturnForms('tds');
    } else {
      this.dataSource.forEach(row => {
        this.selection.select(row);
        this.applicableReturnFormsService.addSelectedReturnForm('tds', row.getFormName);
      });
    }
  }

  toggleSelection(row: any) {
    this.selection.toggle(row);
    if (this.selection.isSelected(row)) {
      this.applicableReturnFormsService.addSelectedReturnForm('tds', row.formName);
    } else {
      this.applicableReturnFormsService.removeReturnForm('tds', row.formName);
    }
  }

  get tdsUserName() {
    return this.tdsReturnForm.get('tdsUserName');
  }

  get tdsPassword() {
    return this.tdsReturnForm.get('tdsPassword');
  }

  get tracesTdsUserName() {
    return this.tdsReturnForm.get('tracesTdsUserName');
  }

  get tracesTdsPassword() {
    return this.tdsReturnForm.get('tracesTdsPassword');
  }

  get tdsTanNo() {
    return this.tdsReturnForm.get('tdsTanNo');
  }

  addTdsReturnInfo() {
    this.submitted = true;
    if (this.tdsReturnForm.invalid) {
      return;
    }
    if (this.applicableReturnFormsService.getSelectedReturnForms == undefined ||
      this.applicableReturnFormsService.getSelectedReturnForms('tds') == undefined ||
      this.applicableReturnFormsService.getSelectedReturnForms('tds').length === 0) {
      return;
    }
    console.log(this.tdsReturnForm.value);
    const tdsReturnCredentials: ReturnCredentials = new ReturnCredentials();
    tdsReturnCredentials.setUserId = this.tdsReturnForm.controls.tdsUserName.value;
    tdsReturnCredentials.setPassword = this.tdsReturnForm.controls.tdsPassword.value;
    tdsReturnCredentials.setAssessmentYear = this.assessmentYear;
    tdsReturnCredentials.setTracesUserId = this.tdsReturnForm.controls.tracesTdsUserName.value;
    tdsReturnCredentials.setTracesPassword = this.tdsReturnForm.controls.tracesTdsPassword.value;
    tdsReturnCredentials.setTanNo = this.tdsReturnForm.controls.tdsTanNo.value;
    tdsReturnCredentials.setReturnType = "tds";
    tdsReturnCredentials.setApplicableReturnForms = this.applicableReturnFormsService.getSelectedReturnForms('tds');
    if (this.editFlag == false) {
      this.apiService.addReturnCredentials(this.clientId, tdsReturnCredentials).subscribe(
        res => {
          console.log(tdsReturnCredentials + " insertion successful");
          this.isSaved.emit(true);
          this.snackBar.open("TDS Credentials Updated", null, {
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
      this.apiService.updateReturnCredentialsByReturnId(this.assessmentYear, this.tdsCred.getReturnId, tdsReturnCredentials)
        .subscribe(
          res => {
            if (res == true) {
              this.snackBar.open("TDS Credentials Updated", null, {
                duration: 3000,
              });
            } else {
              this.snackBar.open("Error Updating TDS Credentials", null, {
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
