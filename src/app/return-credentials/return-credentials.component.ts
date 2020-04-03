import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransferService } from '../shared/data/data-transfer.service';

@Component({
  selector: 'app-return-credentials',
  templateUrl: './return-credentials.component.html',
  styleUrls: ['./return-credentials.component.css']
})
export class ReturnCredentialsComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = -1;
  private clientType: string;

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
  }

  constructor(private router: Router, private dataTransferService: DataTransferService) {
      this.dataTransferService.currentClientType.subscribe(clientType => this.clientType = clientType);
        this.navLinks =  [
          {
            label: 'Income Tax',
            link: './incomeTax',
            index: 0
          },
          {
            label: 'TDS',
            link: './tds',
            index: 1
          },
          {
            label: 'GST',
            link: './gst',
            index: 2
          },
          {
            label: 'ROC',
            link: './roc',
            index: 3
          }
         ];
      }
      checkClientType(label: any): boolean {
            if((label.toString()=="ROC") && ((this.clientType=="company") || (this.clientType=="llp")))
                return true;
            return false;
      }
   }
