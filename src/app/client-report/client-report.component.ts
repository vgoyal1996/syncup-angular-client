import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrintService } from '../shared/print/print.service';

@Component({
  selector: 'app-client-report',
  templateUrl: './client-report.component.html',
  styleUrls: ['./client-report.component.css']
})
export class ClientReportComponent implements OnInit {
  private clientId: string;

  constructor(private activatedRoute: ActivatedRoute, private printService: PrintService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.clientId = params['clientId'];
        console.log(this.clientId);
        this.printService.onDataReady();
      }
    );
  }

}
