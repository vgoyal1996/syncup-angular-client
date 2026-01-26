import { Component, OnInit, ViewChild } from '@angular/core';
import { ReturnCredentials } from 'src/app/model/ReturnCredentials';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SelectedClientDataService } from '../selected-client-data.service';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Constants } from 'src/app/shared/global/constants';
import { AddReturnInfoDialogComponent } from '../add-return-info-dialog/add-return-info-dialog.component';

@Component({
  selector: 'app-tds-return',
  templateUrl: './tds-return.component.html',
  styleUrls: ['./tds-return.component.css'],
  standalone: false
})
export class TdsReturnComponent implements OnInit {
  displayedColumns: string[] = ['formName', 'acknowledgementNo', 'dateOfFiling', 'dateOfPhysicalDeposit', 'actions'];
  dataSource: any[] = [];
  tdsCredentials: ReturnCredentials;
  tdsUserId: string;
  @ViewChild(MatTable) table: MatTable<any>;
  tdsPassword: string;
  tdsTracesUserId: string;
  tdsTracesPassword: string;
  tanNo: string;
  isNotDataPresent: boolean = false;

  constructor(private dataService: SelectedClientDataService, private formBuilder: FormBuilder, private dialog: MatDialog,
    private datepipe: DatePipe) { }

  ngOnInit() {
    this.dataService.currentReturnCredsArray.subscribe(result => {
      this.tdsCredentials = result.filter(cred => cred.getReturnType == "tds")[0];
      this.tdsUserId = this.tdsCredentials.getUserId;
      this.tdsPassword = this.tdsCredentials.getPassword;
      this.tdsTracesUserId = this.tdsCredentials.getTracesUserId;
      this.tdsTracesPassword = this.tdsCredentials.getPassword;
      this.tanNo = this.tdsCredentials.getTanNo;
      this.tdsCredentials.getReturnFormsList.forEach(form => {
        if (form.getDateOfFiling != undefined && form.getDateOfFiling != null) {
          form.setDateOfFiling = this.datepipe.transform(new Date(form.getDateOfFiling), Constants.REVISED_DUE_DATE_OF_FILING_DISPLAY_FORMAT);
        }
        if (form.getDateOfPhysicalDeposit != undefined && form.getDateOfPhysicalDeposit != null) {
          form.setDateOfPhysicalDeposit = this.datepipe.transform(new Date(form.getDateOfPhysicalDeposit), Constants.REVISED_DUE_DATE_OF_FILING_DISPLAY_FORMAT);
        }
      });
      this.dataSource = this.tdsCredentials.getReturnFormsList;
    });
  }

  openAddDialog(element): void {
    const dialogRef = this.dialog.open(AddReturnInfoDialogComponent, {
      width: '600px',
      height: '500px',
      data: {
        clientReturnForm: element,
        assessmentYear: this.tdsCredentials.getAssessmentYear,
        returnId: this.tdsCredentials.getReturnId
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
