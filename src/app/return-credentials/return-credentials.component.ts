import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-return-credentials',
  templateUrl: './return-credentials.component.html',
  styleUrls: ['./return-credentials.component.css']
})
export class ReturnCredentialsComponent implements OnInit {

  navLinks: any[];
  activeLinkIndex = -1;

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
  });
  }

  constructor(private router: Router) {
    this.navLinks = [
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
      },];
  }

}
