import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from '../shared/data/data-transfer.service';
import { NavBarService } from '../nav-bar/nav-bar.service';
import { ApplicableReturnFormsService } from './applicable-return-forms.service';
import { Client } from '../model/Client';

@Component({
  selector: 'app-return-credentials',
  templateUrl: './return-credentials.component.html',
  styleUrls: ['./return-credentials.component.css']
})
export class ReturnCredentialsComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = -1;
  private clientType: string;
  private arr = ["incomeTax", "tds", "gst", "roc"];
  private isDisabled = true;
  selectedClient: Client;
  assessmentYear: string;
  private editFlag: boolean;

  ngOnInit() {
    this.navBar.show();
    this.navBar.changeToolBarTitle("Return Credentials");
    this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === this.router.url));
  }

  constructor(private router: Router, private dataTransferService: DataTransferService, private navBar: NavBarService,
              private applicableReturnFormsService: ApplicableReturnFormsService) {
    this.dataTransferService.currentClientType.subscribe(clientType => this.clientType = clientType);
    this.dataTransferService.currentSelectedClient.subscribe(client => this.selectedClient = client);
    this.dataTransferService.currentAssessmentYear.subscribe(assessmentYear => this.assessmentYear = assessmentYear);
    this.dataTransferService.currentEditReturnCredentialsFlag.subscribe(flag => this.editFlag = flag);
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
    if ((label.toString() == "ROC") && !((this.clientType == "company") || (this.clientType == "llp")))
      return true;
    return false;
  }

  toggleDisabled(component) {
    component.isSaved.subscribe(value => {
      if (this.isDisabled == true) {
        this.isDisabled = !value;
      }
    });
    if (this.editFlag == true) {
      this.isDisabled = false;
    }
  }

  navigateToClientMaster() {
    this.dataTransferService.updateAssessmentYear(this.assessmentYear);
    this.dataTransferService.updateSelectedClient(this.selectedClient);
    this.router.navigateByUrl("/selected-client-master");
  }
}
