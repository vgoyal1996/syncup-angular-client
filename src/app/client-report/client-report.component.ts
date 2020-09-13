import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrintService } from '../shared/print/print.service';
import { SyncupApiService } from '../shared/api/syncup-api.service';
import { Client } from '../model/Client';

@Component({
  selector: 'app-client-report',
  templateUrl: './client-report.component.html',
  styleUrls: ['./client-report.component.css']
})
export class ClientReportComponent implements OnInit {
  private clientId: string;
  private client: Client;

  constructor(private activatedRoute: ActivatedRoute, private printService: PrintService, private apiService: SyncupApiService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
        this.clientId = params['clientId'];
        console.log(this.clientId);
        this.apiService.getClientByClientId(Number(this.clientId)).subscribe(
          res => {
            console.log(res);
            this.client = res;
            this.client
            this.printService.onDataReady();
          }
        )
      }
    );
  }

}
