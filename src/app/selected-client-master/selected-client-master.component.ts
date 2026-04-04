import { Component, OnInit, ViewChild } from '@angular/core';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { DataTransferService } from '../shared/data/data-transfer.service';
import { Client } from '../model/Client';
import { SyncupApiService } from '../shared/api/syncup-api.service';
import { forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';
import { ReturnCredentials } from '../model/ReturnCredentials';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectedClientDataService } from './selected-client-data.service';
import { PrintService } from '../shared/print/print.service';
import { PdfmakeService } from 'ng-pdf-make/pdfmake/pdfmake.service';
import { Cell, Row, Table } from 'ng-pdf-make/objects/table';
import { ReturnForm } from '../model/ReturnForm';
import { ClientReturnForms } from '../model/ClientReturnForms';
import { NotificationService } from '../shared/notification/notification.service';

export class Tile {
  text: string;
  cols: number;
  rows: number;
  color: string;

  constructor(text: string) {
    this.text = text;
    this.cols = 1;
    this.rows = 1;
    this.color = "3px double #7b1fa2";
  }
}

@Component({
  selector: 'app-selected-client-master',
  templateUrl: './selected-client-master.component.html',
  styleUrls: ['./selected-client-master.component.css'],
  standalone: false
})
export class SelectedClientMasterComponent implements OnInit {
  assessmentYear: string;
  selectedClient: Client;
  returnCredsArray: ReturnCredentials[];
  headerTiles: Tile[] = [];
  footerTiles: Tile[] = [];
  selected = new FormControl(0);
  isReturnCredsArrayNotEmpty = false;
  navLinks;
  activeLinkIndex = -1;
  isLoading = false;


  constructor(private navBar: NavBarService, private dataTransferService: DataTransferService,
    private apiService: SyncupApiService, private router: Router, private dataService: SelectedClientDataService,
    private activatedRoute: ActivatedRoute, private printService: PrintService, private pdfmake: PdfmakeService,
    private notificationService: NotificationService) {
    this.navLinks = [
      {
        label: 'Overview',
        link: '/selected-client-master/overview',
        index: 0,
        showLink: true,
        icon: 'dashboard'
      },
      {
        label: 'Income Tax',
        link: '/selected-client-master/incomeTax',
        index: 1,
        showLink: false,
        icon: 'description'
      },
      {
        label: 'TDS',
        link: '/selected-client-master/tds',
        index: 2,
        showLink: false,
        icon: 'account_balance'
      },
      {
        label: 'GST',
        link: '/selected-client-master/gst',
        index: 3,
        showLink: false,
        icon: 'receipt_long'
      },
      {
        label: 'ROC',
        link: '/selected-client-master/roc',
        index: 4,
        showLink: false,
        icon: 'business'
      }
    ];
  }

  ngOnInit() {
    this.navBar.show();
    this.activeLinkIndex = this.navLinks.findIndex(tab => this.router.url.includes(tab.link));
    if (this.activeLinkIndex === -1) this.activeLinkIndex = 0;
    forkJoin([this.dataTransferService.currentAssessmentYear.pipe(first()), this.dataTransferService.currentSelectedClient.pipe(first())]).subscribe(
      results => {
        console.log(results[0]);
        console.log(results[1]);
        this.assessmentYear = results[0];
        this.selectedClient = results[1];
        this.navBar.changeToolBarTitle(this.selectedClient.getName);
        this.isLoading = true;
        this.apiService.getReturnCredentialsByClientId(this.assessmentYear, this.selectedClient.getId).subscribe(
          results2 => {
            console.log(results2);
            this.returnCredsArray = results2;
            if (this.returnCredsArray == undefined || this.returnCredsArray.length == 0) {
              this.isReturnCredsArrayNotEmpty = false;
            } else {
              this.isReturnCredsArrayNotEmpty = true;
            }
            this.dataService.updateReturnCredsArray(this.returnCredsArray);
            this.returnCredsArray.forEach(cred => {
              const linkIndex = this.navLinks.findIndex(link => link.link.endsWith(cred.getReturnType));
              if (linkIndex !== -1) {
                this.navLinks[linkIndex].showLink = true;
              }
            });
            this.isLoading = false;
          },
          err => {
            console.error('Error fetching return credentials', err);
            this.notificationService.showError('Failed to fetch return credentials. Please try again.');
            this.isLoading = false;
          }
        );
      }
    );
  }


  getPdf() {
    this.printReport();
  }

  printReport() {
    this.pdfmake.create();
    this.pdfmake.configureStyles({
      header: { fontSize: 18, bold: true, alignment: 'center', italics: true },
      returnTypeHeader: { fontSize: 16, bold: true, alignment: 'center', decoration: 'underline' }
    });
    this.pdfmake.addText(this.selectedClient.getName, 'header');
    let cred: ReturnCredentials = null;
    cred = this.returnCredsArray.filter(cred => cred.getReturnType == "incomeTax")[0];
    if (cred != null) {
      this.pdfmake.addText('\n\n\n');
      this.pdfmake.addText('Income Tax', 'returnTypeHeader');
      // Create Headers cells
      const header1 = new Cell('Return Name');
      const header2 = new Cell('Acknowledgement No.');
      const header3 = new Cell('Date of Filing');
      const header5 = new Cell('Date of Physical Deposit');

      const headerRows = new Row([header1, header2, header3, header5]);
      const rows = [];
      cred.getReturnFormsList.forEach(form => {
        let returnNameCell: Cell = new Cell(form.getReturnForm.getFormName);
        let acknowledgementNoCell: Cell = new Cell(form.getAcknowledgementNo);
        let dateOfFilingCell: Cell = new Cell(form.getDateOfFiling);
        let dateOfPhysicalDepositCell: Cell = new Cell(form.getDateOfPhysicalDeposit);
        rows.push(new Row([returnNameCell, acknowledgementNoCell, dateOfFilingCell, dateOfPhysicalDepositCell]));
      });

      const widths = ['*', '*', '*', '*'];
      const table = new Table(headerRows, rows, widths);
      this.pdfmake.addTable(table);
    }
    cred = this.returnCredsArray.filter(cred => cred.getReturnType == "tds")[0];
    if (cred != null) {
      this.pdfmake.addText('\n\n\n');
      this.pdfmake.addText('TDS', 'returnTypeHeader');
      // Create Headers cells
      const header1 = new Cell('Return Name');
      const header2 = new Cell('Acknowledgement No.');
      const header3 = new Cell('Date of Filing');
      const header5 = new Cell('Date of Physical Deposit');

      const headerRows = new Row([header1, header2, header3, header5]);
      const rows = [];
      cred.getReturnFormsList.forEach(form => {
        let returnNameCell: Cell = new Cell(form.getReturnForm.getFormName);
        let acknowledgementNoCell: Cell = new Cell(form.getAcknowledgementNo);
        let dateOfFilingCell: Cell = new Cell(form.getDateOfFiling);
        let dateOfPhysicalDepositCell: Cell = new Cell(form.getDateOfPhysicalDeposit);
        rows.push(new Row([returnNameCell, acknowledgementNoCell, dateOfFilingCell, dateOfPhysicalDepositCell]));
      });

      const widths = ['*', '*', '*', '*'];
      const table = new Table(headerRows, rows, widths);
      this.pdfmake.addTable(table);
    }
    cred = this.returnCredsArray.filter(cred => cred.getReturnType == "roc")[0];
    if (cred != null) {
      this.pdfmake.addText('\n\n\n');
      this.pdfmake.addText('ROC', 'returnTypeHeader');
      // Create Headers cells
      const header1 = new Cell('Return Name');
      const header2 = new Cell('Acknowledgement No.');
      const header3 = new Cell('Date of Filing');
      const header5 = new Cell('Date of Physical Deposit');

      const headerRows = new Row([header1, header2, header3, header5]);
      const rows = [];
      cred.getReturnFormsList.forEach(form => {
        let returnNameCell: Cell = new Cell(form.getReturnForm.getFormName);
        let acknowledgementNoCell: Cell = new Cell(form.getAcknowledgementNo);
        let dateOfFilingCell: Cell = new Cell(form.getDateOfFiling);
        let dateOfPhysicalDepositCell: Cell = new Cell(form.getDateOfPhysicalDeposit);
        rows.push(new Row([returnNameCell, acknowledgementNoCell, dateOfFilingCell, dateOfPhysicalDepositCell]));
      });

      const widths = ['*', '*', '*', '*'];
      const table = new Table(headerRows, rows, widths);
      this.pdfmake.addTable(table);
    }
    let gstCreds: ReturnCredentials[] = this.returnCredsArray.filter(cred => cred.getReturnType == "gst");
    if (gstCreds != null) {
      this.pdfmake.addText('\n\n\n');
      this.pdfmake.addText('GST', 'returnTypeHeader');
      let i = 1;
      gstCreds.forEach(gstCred => {
        this.pdfmake.addText('GST Credentials ' + i, { fontSize: 14, alignment: 'center', bold: true });
        // Create Headers cells
        const header1 = new Cell('Return Name');
        const header2 = new Cell('Acknowledgement No.');
        const header3 = new Cell('Date of Filing');
        const header5 = new Cell('Date of Physical Deposit');
        const headerRows = new Row([header1, header2, header3, header5]);
        const rows = [];
        gstCred.getReturnFormsList.forEach(form => {
          let returnNameCell: Cell = new Cell(form.getReturnForm.getFormName);
          let acknowledgementNoCell: Cell = new Cell(form.getAcknowledgementNo);
          let dateOfFilingCell: Cell = new Cell(form.getDateOfFiling);
          let dateOfPhysicalDepositCell: Cell = new Cell(form.getDateOfPhysicalDeposit);
          rows.push(new Row([returnNameCell, acknowledgementNoCell, dateOfFilingCell, dateOfPhysicalDepositCell]));
        });

        const widths = ['*', '*', '*', '*'];
        const table = new Table(headerRows, rows, widths);
        this.pdfmake.addTable(table);
        this.pdfmake.addText('\n\n');
        i++;
      });
    }
    this.pdfmake.open();
  }

  public navigateToReturnCredentials() {
    this.dataTransferService.changeMessage(this.selectedClient.getId.toString());
    this.dataTransferService.updateClient(this.selectedClient.getClientType);
    this.dataTransferService.updateClientObject(this.selectedClient);
    this.dataTransferService.updateAssessmentYear(this.assessmentYear);
    this.router.navigateByUrl('/returnCredentials').then((e) => {
      if (e) {
        console.log('Navigation to return Credentials successful');
      } else {
        console.log('Navigation to return Credentials failed');
      }
    });
  }

  public editReturnCredentials() {
    this.dataTransferService.updateEditReturnCredentialsFlag(true);
    this.dataTransferService.updateReturnCredentialsArrayForEdit(this.returnCredsArray);
    this.navigateToReturnCredentials();
  }

  public addReturnCredentials() {
    this.dataTransferService.updateEditReturnCredentialsFlag(false);
    this.navigateToReturnCredentials();
  }

  // Placeholder for any additional logic if needed for the revamped header
  goBack() {
    this.router.navigate(['/client-master']);
  }

}
