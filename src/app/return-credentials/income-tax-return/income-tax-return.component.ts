import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SyncupApiService } from 'src/app/shared/api/syncup-api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReturnCredentials } from '../../model/ReturnCredentials';
import { DataTransferService } from '../../shared/data/data-transfer.service';
import { ApplicableReturnFormsService } from '../applicable-return-forms.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-income-tax-return',
  templateUrl: './income-tax-return.component.html',
  styleUrls: ['./income-tax-return.component.css']
})
export class IncomeTaxReturnComponent implements OnInit {

  submitted = false;
  selection = new SelectionModel(true, []);
  displayedColumns: string[] = ['select', 'formName', 'periodicity', 'dueDateOfFiling'];
  dataSource: any[] = [];
  private clientId: string;
  private incomeTaxReturnForm: FormGroup;
  @Output() isSaved: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  private assessmentYear: string;

  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService, private dataTransferService: DataTransferService,
    private applicableReturnFormsService: ApplicableReturnFormsService) {
    this.incomeTaxReturnForm = formBuilder.group({
      incomeTaxUserName: this.formBuilder.control('', Validators.required),
      incomeTaxPassword: this.formBuilder.control('', Validators.required)
    });
  }

  ngOnInit() {
    this.dataTransferService.currentMessage.subscribe(message => this.clientId = message);
    this.dataTransferService.currentAssessmentYear.subscribe(assessmentYear => this.assessmentYear = assessmentYear);
    this.applicableReturnFormsService.currentDataSource.subscribe(
      (source) => {
        this.dataSource = this.applicableReturnFormsService.getDataSourceByReturnType('incomeTax');
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
      this.applicableReturnFormsService.clearSelectedReturnForms('incomeTax');
    } else {
      this.dataSource.forEach(row => {
        this.selection.select(row);
        this.applicableReturnFormsService.addSelectedReturnForm('incomeTax', row.formName);
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
      this.applicableReturnFormsService.getSelectedReturnForms('incomeTax') == []) {
      return;
    }
    const incomeTaxCredentials: ReturnCredentials = new ReturnCredentials();
    incomeTaxCredentials.setUserId = this.incomeTaxReturnForm.controls.incomeTaxUserName.value;
    incomeTaxCredentials.setAssessmentYear = this.assessmentYear;
    incomeTaxCredentials.setPassword = this.incomeTaxReturnForm.controls.incomeTaxPassword.value;
    incomeTaxCredentials.setId = +this.clientId;
    incomeTaxCredentials.setReturnType = "incomeTax";
    incomeTaxCredentials.setApplicableReturnForms = this.applicableReturnFormsService.getSelectedReturnForms('incomeTax');
    this.apiService.addReturnCredentials(incomeTaxCredentials).subscribe(
      res => {
        console.log(incomeTaxCredentials + " insertion successful");
        this.isSaved.emit(true);
      },
      err => {
        alert('oops!!! Somthing went wrong');
      }
    );
  }

}
