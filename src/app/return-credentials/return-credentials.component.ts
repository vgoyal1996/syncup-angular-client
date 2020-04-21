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

  navLinks: any[];
  activeLinkIndex = -1;
  private clientType: string;
  private arr = ["incomeTax", "tds", "gst", "roc"];

  ngOnInit() {
    this.navBar.hide();
    this.navBar.changeToolBarTitle("Return Credentials");
    this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === this.router.url));
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
    if ((label.toString() == "ROC") && !((this.clientType == "company") || (this.clientType == "llp")))
      return true;
    return false;
  }

  navigateToClientMaster() {
    this.router.navigateByUrl("/client-master").then((e) => {
      if (e) {
        console.log("successfully navigated to client master");
      } else {
        console.log("Navigation to client master failed");
      }
    });
  }
}
