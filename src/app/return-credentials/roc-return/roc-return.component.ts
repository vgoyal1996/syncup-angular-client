import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {SyncupApiService} from 'src/app/shared/api/syncup-api.service';
import {FormGroup, FormBuilder} from '@angular/forms';
import {ReturnCredentials} from '../../model/ReturnCredentials';
import {DataTransferService} from '../../shared/data/data-transfer.service';
import { ApplicableReturnFormsService } from '../applicable-return-forms.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-roc-return',
  templateUrl: './roc-return.component.html',
  styleUrls: ['./roc-return.component.css']
})
export class RocReturnComponent implements OnInit {

  submitted = false;
  selection = new SelectionModel(true, []);
  displayedColumns: string[] = ['select', 'formName', 'periodicity', 'dueDateOfFiling'];
  dataSource: any[] = [];
  private clientId: string;
  private rocReturnForm: FormGroup;
  @Output() isSaved: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  assessmentYear: string;

  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService, private dataTransferService: DataTransferService, 
              private applicableReturnFormsService: ApplicableReturnFormsService) {
    this.rocReturnForm = this.formBuilder.group({
                rocUserName: this.formBuilder.control(''),
                rocPassword: this.formBuilder.control('')
              });
   }

  ngOnInit() {
    this.dataTransferService.currentMessage.subscribe(message => this.clientId = message);
    this.dataTransferService.currentAssessmentYear.subscribe(assessmentYear => this.assessmentYear = assessmentYear);
    this.applicableReturnFormsService.currentDataSource.subscribe(
      (source) => {
        this.dataSource = this.applicableReturnFormsService.getDataSourceByReturnType('roc');
      }
    );
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
        this.applicableReturnFormsService.addSelectedReturnForm('roc', row.formName);
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
      rocReturnCredentials.setId = +this.clientId;
      rocReturnCredentials.setReturnType = "roc";
      rocReturnCredentials.setApplicableReturnForms = this.applicableReturnFormsService.getSelectedReturnForms('roc');
      this.apiService.addReturnCredentials(rocReturnCredentials).subscribe(
        res => {
          console.log(rocReturnCredentials + " insertion successful");
          this.isSaved.emit(true);
        },
        err => {
          alert('oops!!! Somthing went wrong');
        }
      );
    }

}
