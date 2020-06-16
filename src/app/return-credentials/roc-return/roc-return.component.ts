import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SyncupApiService } from 'src/app/shared/api/syncup-api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReturnCredentials } from '../../model/ReturnCredentials';
import { DataTransferService } from '../../shared/data/data-transfer.service';
import { ApplicableReturnFormsService } from '../applicable-return-forms.service';
import { SelectionModel } from '@angular/cdk/collections';
import { forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { ReturnForm } from 'src/app/model/ReturnForm';

@Component({
  selector: 'app-roc-return',
  templateUrl: './roc-return.component.html',
  styleUrls: ['./roc-return.component.css']
})
export class RocReturnComponent implements OnInit {

  submitted = false;
  selection = new SelectionModel(true, []);
  displayedColumns: string[] = ['select', 'formName', 'periodicity', 'dueDateOfFiling'];
  dataSource: ReturnForm[] = [];
  private clientId: string;
  private rocReturnForm: FormGroup;
  @Output() isSaved: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  assessmentYear: string;
  private editFlag: boolean;
  private rocCred: ReturnCredentials;

  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService, private dataTransferService: DataTransferService,
    private applicableReturnFormsService: ApplicableReturnFormsService, private snackBar: MatSnackBar) {
    this.rocReturnForm = this.formBuilder.group({
      rocUserName: this.formBuilder.control(''),
      rocPassword: this.formBuilder.control('')
    });
  }

  ngOnInit() {
    forkJoin([this.dataTransferService.currentMessage.pipe(first()), this.dataTransferService.currentAssessmentYear.pipe(first()),
    this.applicableReturnFormsService.currentDataSource.pipe(first())]).subscribe(results => {
      this.clientId = results[0];
      this.assessmentYear = results[1];
      this.dataSource = this.applicableReturnFormsService.getDataSourceByReturnType('roc');
      this.dataTransferService.currentEditReturnCredentialsFlag.subscribe(flag => {
        this.editFlag = flag;
        if (flag == true) {
          this.dataTransferService.currentReturnCredentialsArrayForEdit.subscribe(creds => {
            this.rocCred = creds.filter(cred => cred.getReturnType == 'roc')[0];
            this.rocReturnForm.setValue({
              rocUserName: this.rocCred.getUserId,
              rocPassword: this.rocCred.getPassword
            });
            this.rocCred.getReturnFormsList.forEach(clientReturnForm => {
              this.selection.select(this.dataSource.find(form => form.getFormName == clientReturnForm.getReturnForm.getFormName));
              this.applicableReturnFormsService.addSelectedReturnForm('roc', clientReturnForm.getReturnForm.getFormName);
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
      this.applicableReturnFormsService.clearSelectedReturnForms('roc');
    } else {
      this.dataSource.forEach(row => {
        this.selection.select(row);
        this.applicableReturnFormsService.addSelectedReturnForm('roc', row.getFormName);
      });
    }
  }

  toggleSelection(row: any) {
    this.selection.toggle(row);
    if (this.selection.isSelected(row)) {
      this.applicableReturnFormsService.addSelectedReturnForm('roc', row.formName);
    } else {
      this.applicableReturnFormsService.removeReturnForm('roc', row.formName);
    }
  }

  get rocUserName() {
    return this.rocReturnForm.get('rocUserName');
  }

  get rocPassword() {
    return this.rocReturnForm.get('rocPassword');
  }

  addRocReturnInfo() {
    this.submitted = true;
    if (this.rocReturnForm.invalid) {
      return;
    }
    if (this.applicableReturnFormsService.getSelectedReturnForms == undefined ||
      this.applicableReturnFormsService.getSelectedReturnForms('roc') == undefined ||
      this.applicableReturnFormsService.getSelectedReturnForms('roc') == []) {
      return;
    }
    console.log(this.rocReturnForm);
    const rocReturnCredentials: ReturnCredentials = new ReturnCredentials();
    rocReturnCredentials.setUserId = this.rocReturnForm.controls.rocUserName.value;
    rocReturnCredentials.setPassword = this.rocReturnForm.controls.rocPassword.value;
    rocReturnCredentials.setAssessmentYear = this.assessmentYear;
    rocReturnCredentials.setReturnType = "roc";
    rocReturnCredentials.setApplicableReturnForms = this.applicableReturnFormsService.getSelectedReturnForms('roc');
    if (this.editFlag == false) {
      this.apiService.addReturnCredentials(this.clientId, rocReturnCredentials).subscribe(
        res => {
          console.log(rocReturnCredentials + " insertion successful");
          this.isSaved.emit(true);
        },
        err => {
          alert('oops!!! Somthing went wrong');
        }
      ); this.apiService.addReturnCredentials(this.clientId, rocReturnCredentials).subscribe(
        res => {
          console.log(rocReturnCredentials + " insertion successful");
          this.isSaved.emit(true);
          this.snackBar.open("ROC Credentials Updated", null, {
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
      this.apiService.updateReturnCredentialsByReturnId(this.assessmentYear, this.rocCred.getReturnId, rocReturnCredentials)
        .subscribe(
          res => {
            if (res == true) {
              this.snackBar.open("ROC Credentials Updated", null, {
                duration: 3000,
              });
            } else {
              this.snackBar.open("Error Updating ROC Credentials", null, {
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
