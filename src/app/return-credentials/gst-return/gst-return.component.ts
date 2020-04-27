import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SyncupApiService } from 'src/app/shared/api/syncup-api.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ReturnCredentials } from '../../model/ReturnCredentials';
import { DataTransferService } from '../../shared/data/data-transfer.service';
import { ApplicableReturnFormsService } from '../applicable-return-forms.service';
import { Client } from 'src/app/model/Client';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-gst-return',
  templateUrl: './gst-return.component.html',
  styleUrls: ['./gst-return.component.css']
})
export class GstReturnComponent implements OnInit {

  private clientId: string;
  selections = [];
  displayedColumns: string[] = ['select', 'formName', 'periodicity', 'dueDateOfFiling'];
  private gstReturnForm: FormGroup;
  private clientObject: Client;
  private dataSources: any;
  @Output() isSaved: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  assessmentYear: string;

  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService, private dataTransferService: DataTransferService,
    private applicableReturnFormsService: ApplicableReturnFormsService) {
    this.gstReturnForm = this.formBuilder.group({
      returnForms: this.formBuilder.array([
      ])
    });
  }

  isAllSelected(index) {
    const numSelected = this.selections[index].selected.length;
    const numRows = this.dataSources[index].length;
    return numSelected === numRows;
  }

  toggleSelection(index: any, row: any) {
    console.log(this.selections[index]);
    this.selections[index].toggle(row);
    if (this.selections[index].isSelected(row)) {
      this.applicableReturnFormsService.addSelectedReturnForm('gst'+index, row.formName);
    } else {
      this.applicableReturnFormsService.removeReturnForm('gst'+index, row.formName);
    }
  }

  masterToggle(index) {
    console.log(this.selections[index].selected);
    if (this.isAllSelected(index)) {
      this.selections[index].clear();
      this.applicableReturnFormsService.clearSelectedReturnForms('gst'+index);
    } else {
      this.dataSources[index].forEach(row => {
        this.selections[index].select(row);
        this.applicableReturnFormsService.addSelectedReturnForm('gst'+index, row.formName);
      });
    }
  }

  ngOnInit() {
    this.dataTransferService.currentMessage.subscribe(message => this.clientId = message);
    this.dataTransferService.currentClientObject.subscribe(client => {
      this.clientObject = client;
      console.log(client);
    });
    this.dataTransferService.currentAssessmentYear.subscribe(assessmentYear => {
      this.assessmentYear = assessmentYear;
      console.log(assessmentYear);
    });
    this.applicableReturnFormsService.currentDataSource.subscribe(
      (source) => {
        this.dataSources = new Array();
        this.dataSources.push(this.applicableReturnFormsService.getDataSourceByReturnType('gst'));
        this.addReturnForm();
        this.removeReturnForm(0);
      }
    );
  }

  getReturnForm(): FormGroup {
    return this.formBuilder.group({
      gstFlatNo: this.formBuilder.control('', Validators.required),
      gstArea: this.formBuilder.control('', Validators.required),
      gstCity: this.formBuilder.control('', Validators.required),
      gstState: this.formBuilder.control('', Validators.required),
      gstPin: this.formBuilder.control('', Validators.required),
      gstNo: this.formBuilder.control('', Validators.required),
      gstUserName: this.formBuilder.control('', Validators.required),
      gstPassword: this.formBuilder.control('', Validators.required)
    });
  }

  addReturnForm(): void {
    this.dataSources.push(this.applicableReturnFormsService.getDataSourceByReturnType('gst'));
    const returnFormArray = this.gstReturnForm.controls['returnForms'] as FormArray;
    returnFormArray.push(this.getReturnForm());
    this.selections.push(new SelectionModel(true, []));
  }

  removeReturnForm(rowIndex: number): void {
    const returnFormArray = <FormArray>this.gstReturnForm.controls['returnForms'];
    if (returnFormArray.length > 1) {
      returnFormArray.removeAt(rowIndex);
      this.dataSources.pop();
      this.selections.pop();
    }
  }

  setFormFieldsAsMaster() {
    let control = (<FormArray>this.gstReturnForm.get('returnForms')).controls[0];
    control.patchValue({
      gstFlatNo: this.clientObject.getFlatNo,
      getArea: this.clientObject.getArea,
      gstCity: this.clientObject.getCity,
      gstState: this.clientObject.getState,
      gstPin: this.clientObject.getPin
    });
  }

  get returnForms(): FormArray {
    return this.gstReturnForm.get('returnForms') as FormArray;
  }

  saveReturnInfo(): void {  
    if (this.gstReturnForm.invalid) {
      alert("GST Return Form is invalid");
      return;
    }
    for (let i=0; i<(<FormArray>this.gstReturnForm.get('returnForms')).controls.length; i++) {
      if (this.applicableReturnFormsService.getSelectedReturnForms == undefined ||
        this.applicableReturnFormsService.getSelectedReturnForms('gst'+i) == undefined ||
        this.applicableReturnFormsService.getSelectedReturnForms('gst'+i) == []) {
        alert("Applicable return forms not selected for Form No. "+ (i+1));
        return;
      }
    }
    let i = 0;
    for (const control of (<FormArray>this.gstReturnForm.get('returnForms')).controls) {
      const gstCredentials: ReturnCredentials = new ReturnCredentials();
      gstCredentials.setFlatNo = control.get('gstFlatNo').value;
      gstCredentials.setAssessmentYear = this.assessmentYear;
      gstCredentials.setArea = control.get('gstArea').value;
      gstCredentials.setCity = control.get('gstCity').value;
      gstCredentials.setState = control.get('gstState').value;
      gstCredentials.setPin = control.get('gstPin').value;
      gstCredentials.setGstNo = control.get('gstNo').value;
      gstCredentials.setUserId = control.get('gstUserName').value;
      gstCredentials.setPassword = control.get('gstPassword').value;
      gstCredentials.setReturnType = "gst";
      gstCredentials.setApplicableReturnForms = this.applicableReturnFormsService.getSelectedReturnForms('gst'+i);
      i++;
      this.apiService.addReturnCredentials(this.clientId, gstCredentials).subscribe(
        res => {
          console.log(gstCredentials + " insertion successful");
          this.isSaved.emit(true);
        },
        err => {
          alert('oops!!! Somthing went wrong');
        }
      );
    }
  }
}
