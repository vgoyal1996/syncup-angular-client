import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from '../shared/data/data-transfer.service';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ApplicableReturnFormsService } from './applicable-return-forms.service';

@Component({
  selector: 'app-return-credentials',
  templateUrl: './return-credentials.component.html',
  styleUrls: ['./return-credentials.component.css']
})
export class ReturnCredentialsComponent implements OnInit {

  displayedColumns: string[] = ['select', 'formName', 'periodicity', 'dueDateOfFiling'];
  selection = new SelectionModel(true, []);
  dataSource: any[] = [];
  navLinks: any[];
  activeLinkIndex = -1;
  private clientType: string;
  private arr = ["incomeTax", "tds", "gst", "roc"];

  ngOnInit() {
    this.navBar.hide();
    this.navBar.changeToolBarTitle("Return Credentials");
    this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === this.router.url));
    this.router.events.subscribe((res) => {
          this.selection.clear();
          this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === this.router.url));
          this.dataSource = this.applicableReturnFormsService.getDataSourceByReturnType(this.arr[this.activeLinkIndex]);
    });
    this.applicableReturnFormsService.currentDataSource.subscribe(
      (source) => {
        this.dataSource = this.applicableReturnFormsService.getDataSourceByReturnType(this.arr[this.activeLinkIndex]);
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
      this.applicableReturnFormsService.clearSelectedReturnForms();
    } else {
      this.dataSource.forEach(row => {
        this.selection.select(row);
        this.applicableReturnFormsService.addSelectedReturnForm(row.formName);
      });
    } 
  }

  toggleSelection(row: any) {
    this.selection.toggle(row);
    if (this.selection.isSelected(row)) {
      this.applicableReturnFormsService.addSelectedReturnForm(row.formName);
    } else {
      this.applicableReturnFormsService.removeReturnForm(row.formName);
    }
  }

  constructor(private router: Router, private dataTransferService: DataTransferService, private navBar: NavBarService,
              private applicableReturnFormsService: ApplicableReturnFormsService) {
    this.dataTransferService.currentClientType.subscribe(clientType => this.clientType = clientType);
    this.applicableReturnFormsService.initializeDataSource();
    this.navLinks = [
      {
        label: 'Income Tax',
        link: '/returnCredentials/incomeTax',
        index: 0
      },
      {
        label: 'TDS',
        link: '/returnCredentials/tds',
        index: 1
      },
      {
        label: 'GST',
        link: '/returnCredentials/gst',
        index: 2
      },
      {
        label: 'ROC',
        link: '/returnCredentials/roc',
        index: 3
      }
    ];
  }
  checkClientType(label: any): boolean {
    if ((label.toString() == "ROC") && ((this.clientType == "company") || (this.clientType == "llp")))
      return true;
    return false;
  }
}
