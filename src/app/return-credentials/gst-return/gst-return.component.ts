import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SyncupApiService } from 'src/app/shared/api/syncup-api.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ReturnCredentials } from '../../model/ReturnCredentials';
import { DataTransferService } from '../../shared/data/data-transfer.service';
import { ApplicableReturnFormsService } from '../applicable-return-forms.service';
import { Client } from 'src/app/model/Client';
import { SelectionModel } from '@angular/cdk/collections';
import { forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

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
  private editFlag: boolean;
  private gstCreds: ReturnCredentials[];

  constructor(private formBuilder: FormBuilder, private apiService: SyncupApiService, private dataTransferService: DataTransferService,
    private applicableReturnFormsService: ApplicableReturnFormsService, private snackBar: MatSnackBar) {
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
      this.applicableReturnFormsService.addSelectedReturnForm('gst' + index, row.formName);
    } else {
      this.applicableReturnFormsService.removeReturnForm('gst' + index, row.formName);
    }
  }

  masterToggle(index) {
    console.log(this.selections[index].selected);
    if (this.isAllSelected(index)) {
      this.selections[index].clear();
      this.applicableReturnFormsService.clearSelectedReturnForms('gst' + index);
    } else {
      this.dataSources[index].forEach(row => {
        this.selections[index].select(row);
        this.applicableReturnFormsService.addSelectedReturnForm('gst' + index, row.formName);
      });
    }
  }

  ngOnInit() {
    forkJoin([this.dataTransferService.currentMessage.pipe(first()), this.dataTransferService.currentClientObject.pipe(first()),
    this.dataTransferService.currentAssessmentYear.pipe(first()), this.applicableReturnFormsService.currentDataSource.pipe(first())]).subscribe(results => {
      this.clientId = results[0];
      this.clientObject = results[1];
      this.assessmentYear = results[2];
      this.dataSources = new Array();
      this.dataSources.push(this.applicableReturnFormsService.getDataSourceByReturnType('gst'));
      this.dataTransferService.currentEditReturnCredentialsFlag.subscribe(flag => {
        this.editFlag = flag;
        if (flag == true) {
          this.dataTransferService.currentReturnCredentialsArrayForEdit.subscribe(creds => {
            this.gstCreds = creds.filter(cred => cred.getReturnType == 'gst');
            let i = 0;
            this.gstCreds.forEach(gstCred => {
              this.addReturnForm(gstCred, i);
              if (i == 0) {
                this.removeReturnForm(0);
              }
              i++;
            });
          });
        } else {
          this.addReturnForm();
          this.removeReturnForm(0);
        }
      });
    });
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

  addReturnForm(gstCred?: ReturnCredentials, index?: number): void {
    this.dataSources.push(this.applicableReturnFormsService.getDataSourceByReturnType('gst'));
    const returnFormArray = this.gstReturnForm.controls['returnForms'] as FormArray;
    let gstForm = this.getReturnForm();
    if (gstCred != undefined) {
      gstForm.setValue({
        gstFlatNo: gstCred.getFlatNo,
        gstArea: gstCred.getArea,
        gstCity: gstCred.getCity,
        gstState: gstCred.getState,
        gstPin: gstCred.getPin,
        gstNo: gstCred.getGstNo,
        gstUserName: gstCred.getUserId,
        gstPassword: gstCred.getPassword
      });
      let selectionModel = new SelectionModel(true, []);
      gstCred.getReturnFormsList.forEach(clientReturnForm => {
        selectionModel.select(this.dataSources[this.dataSources.length - 1].find(form => form.getFormName == clientReturnForm.getReturnForm.getFormName));
        this.applicableReturnFormsService.addSelectedReturnForm('gst' + index, clientReturnForm.getReturnForm.getFormName);
      });
      returnFormArray.push(gstForm);
      this.selections.push(selectionModel);
    } else {
      returnFormArray.push(gstForm);
      this.selections.push(new SelectionModel(true, []));
    }
  }

  removeReturnForm(rowIndex: number): void {
    const returnFormArray = <FormArray>this.gstReturnForm.controls['returnForms'];
    if (returnFormArray.length > 1) {
      returnFormArray.removeAt(rowIndex);
      this.dataSources.splice(rowIndex, 1);
      this.selections.splice(rowIndex, 1);
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
    for (let i = 0; i < (<FormArray>this.gstReturnForm.get('returnForms')).controls.length; i++) {
      if (this.applicableReturnFormsService.getSelectedReturnForms == undefined ||
        this.applicableReturnFormsService.getSelectedReturnForms('gst' + i) == undefined ||
        this.applicableReturnFormsService.getSelectedReturnForms('gst' + i) == []) {
        alert("Applicable return forms not selected for Form No. " + (i + 1));
        return;
      }
    }
    let i = 0;
    let isAllInserted = true;
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
      gstCredentials.setApplicableReturnForms = this.applicableReturnFormsService.getSelectedReturnForms('gst' + i);
      if (this.editFlag == false) {
        this.apiService.addReturnCredentials(this.clientId, gstCredentials).subscribe(
          res => {
            console.log(gstCredentials + " insertion successful");
            this.isSaved.emit(true);
          },
          err => {
            alert('oops!!! Somthing went wrong');
            isAllInserted = false;
          }
        );
      } else {
        this.apiService.updateReturnCredentialsByReturnId(this.assessmentYear, this.gstCreds[i].getReturnId, gstCredentials)
          .subscribe(
            res => {
              if (res == true) {
                console.log(gstCredentials + " updation successful");
              } else {
                console.log(gstCredentials + " updation failed")
                isAllInserted = false;
              }
            },
            err => {
              console.log(err);
              isAllInserted = false;
            }
          );
      }
      i++;
    }
    if (isAllInserted == true) {
      if (this.editFlag == true) {
        this.snackBar.open("GST Credentials Updated", null, {
          duration: 3000,
        });
      } else {
        this.snackBar.open("GST Credentials inserted", null, {
          duration: 3000,
        });
      }
    } else {
      this.snackBar.open("OOPS!!! An error Occurred", null, {
        duration: 4000,
      });
    }
  }
}
