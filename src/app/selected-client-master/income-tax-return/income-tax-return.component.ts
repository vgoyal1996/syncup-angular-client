import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectedClientDataService } from '../selected-client-data.service';
import { ReturnCredentials } from 'src/app/model/ReturnCredentials';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatTable } from '@angular/material';
import { AddReturnInfoDialogComponent } from '../add-return-info-dialog/add-return-info-dialog.component';
import { DatePipe } from '@angular/common';
import { Constants } from 'src/app/shared/global/constants';

@Component({
  selector: 'app-income-tax-return',
  templateUrl: './income-tax-return.component.html',
  styleUrls: ['./income-tax-return.component.css']
})
export class IncomeTaxReturnComponent implements OnInit {
  displayedColumns: string[] = ['formName', 'acknowledgementNo', 'dateOfFiling', 'dateOfPhysicalDeposit', 'actions'];
  dataSource: any[] = [];
  private incomeTaxCredentials: ReturnCredentials;
  private incomeTaxUserId: string;
  @ViewChild(MatTable) table: MatTable<any>;
  private incomeTaxPassword: string;
  isNotDataPresent: boolean = false;

  constructor(private dataService: SelectedClientDataService, private formBuilder: FormBuilder, private dialog: MatDialog,
    private datepipe: DatePipe) {
  }

  ngOnInit() {
    this.dataService.currentReturnCredsArray.subscribe(result => {
      this.incomeTaxCredentials = result.filter(cred => cred.getReturnType == "incomeTax")[0];
      if (this.incomeTaxCredentials == null) {
        return;
      }
      this.incomeTaxUserId = this.incomeTaxCredentials.getUserId;
      this.incomeTaxPassword = this.incomeTaxCredentials.getPassword;
      this.incomeTaxCredentials.getReturnFormsList.forEach(form => {
        if (form.getDateOfFiling != undefined && form.getDateOfFiling != null) {
          form.setDateOfFiling = this.datepipe.transform(new Date(form.getDateOfFiling), Constants.REVISED_DUE_DATE_OF_FILING_DISPLAY_FORMAT);
        }
        if (form.getDateOfPhysicalDeposit != undefined && form.getDateOfPhysicalDeposit != null) {
          form.setDateOfPhysicalDeposit = this.datepipe.transform(new Date(form.getDateOfPhysicalDeposit), Constants.REVISED_DUE_DATE_OF_FILING_DISPLAY_FORMAT);
        }
      });
      this.dataSource = this.incomeTaxCredentials.getReturnFormsList;
    });
  }

  openAddDialog(element): void {
    const dialogRef = this.dialog.open(AddReturnInfoDialogComponent, {
      width: '600px',
      height: '500px',
      data: {
        clientReturnForm: element,
        assessmentYear: this.incomeTaxCredentials.getAssessmentYear,
        returnId: this.incomeTaxCredentials.getReturnId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result != undefined) {
        let form = this.dataSource.find(form => form.getReturnForm.getFormName == result.formName);
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
