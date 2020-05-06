import { Component, OnInit, ViewChild } from '@angular/core';
import { ReturnCredentials } from 'src/app/model/ReturnCredentials';
import { MatTable, MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';
import { SelectedClientDataService } from '../selected-client-data.service';
import { FormBuilder } from '@angular/forms';
import { Constants } from 'src/app/shared/global/constants';
import { AddReturnInfoDialogComponent } from '../add-return-info-dialog/add-return-info-dialog.component';

@Component({
  selector: 'app-gst-return',
  templateUrl: './gst-return.component.html',
  styleUrls: ['./gst-return.component.css']
})
export class GstReturnComponent implements OnInit {
  displayedColumns: string[] = ['formName', 'acknowledgementNo', 'dateOfFiling', 'dateOfPhysicalDeposit', 'actions'];
  dataSources: any[] = [];
  private gstCredentials: ReturnCredentials[];
  @ViewChild(MatTable) table: MatTable<any>;
  isNotDataPresent: boolean = false;

  constructor(private dataService: SelectedClientDataService, private formBuilder: FormBuilder, private dialog: MatDialog,
    private datepipe: DatePipe) { }

  ngOnInit() {
    this.dataService.currentReturnCredsArray.subscribe(result => {
      this.gstCredentials = result.filter(cred => cred.getReturnType == "gst");
      this.gstCredentials.forEach(credential => {
        credential.getReturnFormsList.forEach(form => {
          if (form.getDateOfFiling != undefined && form.getDateOfFiling != null) {
            form.setDateOfFiling = this.datepipe.transform(new Date(form.getDateOfFiling), Constants.REVISED_DUE_DATE_OF_FILING_DISPLAY_FORMAT);
          }
          if (form.getDateOfPhysicalDeposit != undefined && form.getDateOfPhysicalDeposit != null) {
            form.setDateOfPhysicalDeposit = this.datepipe.transform(new Date(form.getDateOfPhysicalDeposit), Constants.REVISED_DUE_DATE_OF_FILING_DISPLAY_FORMAT);
          }
        });
        this.dataSources.push(credential.getReturnFormsList);
      });
    });
  }

  openAddDialog(element, index): void {
    console.log(element);
    const dialogRef = this.dialog.open(AddReturnInfoDialogComponent, {
      width: '600px',
      height: '500px',
      data: {
        clientReturnForm: element,
        assessmentYear: this.gstCredentials[index].getAssessmentYear,
        returnId: this.gstCredentials[index].getReturnId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result != undefined) {
        let form = this.dataSources[index].find(form => form.getReturnForm.getFormName == result.formName);
        form.setAcknowledgementNo = result.acknowledgementNo;
        form.setDateOfFiling = this.datepipe.transform(new Date(result.dateOfFiling), Constants.REVISED_DUE_DATE_OF_FILING_DISPLAY_FORMAT);
        if (result.dateOfPhysicalDeposit != undefined) {
          form.setDateOfPhysicalDeposit = this.datepipe.transform(new Date(result.dateOfPhysicalDeposit), Constants.REVISED_DUE_DATE_OF_FILING_DISPLAY_FORMAT);
        }
        this.table.renderRows();
      }
    });
  }
}
