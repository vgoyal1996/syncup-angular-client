import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {SyncupApiService} from 'src/app/shared/api/syncup-api.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ReturnCredentials} from '../../model/ReturnCredentials';
import {DataTransferService} from '../../shared/data/data-transfer.service';
import { ApplicableReturnFormsService } from '../applicable-return-forms.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-tds-return',
  templateUrl: './tds-return.component.html',
  styleUrls: ['./tds-return.component.css']
})
export class TdsReturnComponent implements OnInit {

  submitted = false;
  selection = new SelectionModel(true, []);
  displayedColumns: string[] = ['select', 'formName', 'periodicity', 'dueDateOfFiling'];
  dataSource: any[] = [];
  private clientId: string;
  private tdsReturnForm: FormGroup;
  @Output() isSaved: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  assessmentYear: string;

  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService, private dataTransferService: DataTransferService, 
              private applicableReturnFormsService: ApplicableReturnFormsService) {
    this.tdsReturnForm = this.formBuilder.group({
                    tdsTanNo: this.formBuilder.control('', Validators.required),
                    tdsUserName: this.formBuilder.control('', Validators.required),
                    tdsPassword: this.formBuilder.control('', Validators.required),
                    tracesTdsUserName: this.formBuilder.control('', Validators.required),
                    tracesTdsPassword: this.formBuilder.control('', Validators.required)
                  });
   }

  ngOnInit() {
    this.dataTransferService.currentMessage.subscribe(message => this.clientId = message);
    this.dataTransferService.currentAssessmentYear.subscribe(assessmentYear => this.assessmentYear = assessmentYear);
    this.applicableReturnFormsService.currentDataSource.subscribe(
      (source) => {
        this.dataSource = this.applicableReturnFormsService.getDataSourceByReturnType('tds');
      }
    );
    this.dataTransferService.currentEditReturnCredentialsFlag.subscribe(flag => {
      if (flag == true) {
        this.dataTransferService.currentReturnCredentialsArrayForEdit.subscribe(creds => {
          let tdsCred = creds.filter(cred => cred.getReturnType == 'tds')[0];
          this.tdsReturnForm.setValue({
            tdsTanNo: tdsCred.getTanNo,
            tdsUserName: tdsCred.getUserId,
            tdsPassword: tdsCred.getPassword,
            tracesTdsPassword: tdsCred.getTracesPassword,
            tracesTdsUserName: tdsCred.getTracesUserId
          });
        });
      }
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
        this.applicableReturnFormsService.addSelectedReturnForm('tds', row.formName);
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
      this.applicableReturnFormsService.getSelectedReturnForms('tds') == []) {
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
    tdsReturnCredentials.setId = +this.clientId;
    tdsReturnCredentials.setReturnType = "tds";
    tdsReturnCredentials.setApplicableReturnForms = this.applicableReturnFormsService.getSelectedReturnForms('tds');
    this.apiService.addReturnCredentials(tdsReturnCredentials).subscribe(
      res => {
        console.log(tdsReturnCredentials + " insertion successful");
        this.isSaved.emit(true);
      },
      err => {
        alert('oops!!! Somthing went wrong');
      }
    );
  }

}
